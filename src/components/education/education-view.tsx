"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import Fuse from "fuse.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Award, Search, ArrowUpNarrowWide, ArrowDownWideNarrow } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Education } from "@/lib/education";

const ITEMS_PER_PAGE = 5;

// UI interativa da página de educação (busca, ordenação, paginação e visualizador
// de certificado). Os dados já vêm buscados no servidor via prop `items` — não há
// fetch no cliente, evitando erros de rede/CORS no navegador.
export function EducationView({ items }: { items: Education[] }) {
  const t = useTranslations("education");
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("duração");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Mantém o valor atual de sortBy acessível de forma síncrona, e registra qual era
  // o campo no início do clique (pointerdown) — antes de qualquer atualização de estado.
  // Isso evita uma condição de corrida: ao trocar de campo, o onValueChange re-renderiza
  // antes do onClick, que passaria a enxergar o sortBy já atualizado e inverteria a
  // direção indevidamente.
  const sortByRef = useRef(sortBy);
  useEffect(() => {
    sortByRef.current = sortBy;
  }, [sortBy]);
  const interactionStartSortByRef = useRef(sortBy);

  // Direção padrão por campo: duração começa do maior para o menor (mais horas primeiro),
  // os demais campos começam em ordem crescente (A-Z).
  const defaultSortDir = (field: string): "asc" | "desc" =>
    field === "duração" ? "desc" : "asc";

  // Troca o campo de ordenação (opção diferente da atual no select). Também cobre
  // seleção por teclado, já que o onValueChange dispara em ambos os casos.
  const handleSortFieldChange = (value: string) => {
    setSortBy(value);
    setSortDir(defaultSortDir(value));
    setCurrentPage(1);
  };

  // Ao selecionar novamente a opção já ativa, inverte a direção (A-Z <-> Z-A).
  // Compara com o campo capturado no início do clique para não confundir uma troca
  // de campo (tratada pelo onValueChange) com uma reseleção.
  const handleSortReselect = (value: string) => {
    if (value !== interactionStartSortByRef.current) return;
    setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentPage(1);
  };

  const fuse = useMemo(() => {
    if (items.length === 0) return null;
    return new Fuse(items, {
      keys: ["instituicao", "curso", "local", "certificacoes"],
      includeScore: true,
      threshold: 0.4,
    });
  }, [items]);

  const filteredItems = useMemo(() => {
    if (!searchTerm || !fuse) {
      return items;
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse, items]);

  const sortedAndFilteredItems = useMemo(() => {
    const directionFactor = sortDir === "asc" ? 1 : -1;
    return [...filteredItems].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "id":
          comparison = a.id - b.id;
          break;
        case "duração": {
          const durA = parseInt(a.duracao.match(/\d+/)?.[0] || "0");
          const durB = parseInt(b.duracao.match(/\d+/)?.[0] || "0");
          comparison = durA - durB;
          break;
        }
        case "curso":
          comparison = a.curso.localeCompare(b.curso);
          break;
        case "local":
          comparison = a.local.localeCompare(b.local);
          break;
        case "instituicao":
          comparison = a.instituicao.localeCompare(b.instituicao);
          break;
        default:
          comparison = 0;
      }
      return comparison * directionFactor;
    });
  }, [filteredItems, sortBy, sortDir]);

  const totalPages = Math.ceil(sortedAndFilteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedAndFilteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Adicionado o scroll para o topo da página com animação suave
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenCertificate = (url: string) => {
    setCertificateUrl(url);
  };

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={handleSortFieldChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <span className="flex items-center gap-2 min-w-0">
              {sortDir === "asc" ? (
                <ArrowUpNarrowWide className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              ) : (
                <ArrowDownWideNarrow className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
              )}
              <SelectValue placeholder={t("sortPlaceholder")} />
            </span>
          </SelectTrigger>
          <SelectContent
            onPointerDownCapture={() => {
              interactionStartSortByRef.current = sortByRef.current;
            }}
          >
            <SelectItem value="id" onClick={() => handleSortReselect("id")}>{t("sortDefault")}</SelectItem>
            <SelectItem value="curso" onClick={() => handleSortReselect("curso")}>{t("sortCourse")}</SelectItem>
            <SelectItem value="duração" onClick={() => handleSortReselect("duração")}>{t("sortDuration")}</SelectItem>
            <SelectItem value="local" onClick={() => handleSortReselect("local")}>{t("sortLocation")}</SelectItem>
            <SelectItem value="instituicao" onClick={() => handleSortReselect("instituicao")}>{t("sortInstitution")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {paginatedItems.map((item) => (
          <Card key={item.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{item.curso}</CardTitle>
                  <p className="text-primary font-medium mt-1">
                    {item.instituicao}
                  </p>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.duracao}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {item.local}
              </div>
              <p>{item.descricao}</p>
              <div>
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <Award className="h-4 w-4 mr-1" />
                  {t("certifications")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.certificacoes.map((cert, i) => (
                    <Badge key={i} variant="secondary">{cert}</Badge>
                  ))}
                </div>
              </div>
              {item.link && (
                <Button
                  size="sm"
                  className="mt-2 flex items-center gap-1"
                  onClick={() => handleOpenCertificate(item.link)}
                >
                  <Award className="h-4 w-4" />
                  {t("viewCertificate")}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.max(1, currentPage - 1));
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(Math.min(totalPages, currentPage + 1));
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog
        open={!!certificateUrl}
        onOpenChange={(isOpen) => !isOpen && setCertificateUrl(null)}
      >
        <DialogContent className="p-0 w-[90vw] max-w-[1200px] flex flex-col">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>{t("certificateViewer")}</DialogTitle>
          </DialogHeader>
          <div className="w-full p-2 pt-0">
            {certificateUrl && (
              <iframe
                src={certificateUrl.replace("/view?usp=sharing", "/preview")}
                className="w-full aspect-video border-0 rounded-md"
                title={t("certificateAlt")}
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
