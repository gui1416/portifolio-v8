"use client";

import { useState, useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Award, Search } from "lucide-react";
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
import { getEducation, Education } from "@/lib/education";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 5;

export default function Educacao() {
  const [educacaoItems, setEducacaoItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEducation();
        setEducacaoItems(data);
      } catch (error) {
        console.error("Falha ao buscar dados de educação:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fuse = useMemo(() => {
    if (educacaoItems.length === 0) return null;
    return new Fuse(educacaoItems, {
      keys: ["instituicao", "curso", "local", "certificacoes"],
      includeScore: true,
      threshold: 0.4,
    });
  }, [educacaoItems]);

  const filteredItems = useMemo(() => {
    if (!searchTerm || !fuse) {
      return educacaoItems;
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }, [searchTerm, fuse, educacaoItems]);

  const sortedAndFilteredItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      switch (sortBy) {
        case "id":
          return a.id - b.id;
        case "duração":
          const durA = parseInt(a.duracao.match(/\d+/)?.[0] || "0");
          const durB = parseInt(b.duracao.match(/\d+/)?.[0] || "0");
          return durA - durB;
        case "curso":
          return a.curso.localeCompare(b.curso);
        case "local":
          return a.local.localeCompare(b.local);
        case "instituicao":
          return a.instituicao.localeCompare(b.instituicao);
        default:
          return 0;
      }
    });
  }, [filteredItems, sortBy]);

  const totalPages = Math.ceil(sortedAndFilteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = sortedAndFilteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Adicionado o scroll para o topo da página com animação suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCertificate = (url: string) => {
    setCertificateUrl(url);
  };

  return (
    <div className="container mx-auto max-w-4xl animate-fadeIn">
      <h1 className="text-4xl font-bold mb-4">Educação</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Pesquisar por curso, instituição..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy} disabled={loading}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id">Padrão (ID)</SelectItem>
            <SelectItem value="curso">Curso</SelectItem>
            <SelectItem value="duração">Duração</SelectItem>
            <SelectItem value="local">Local</SelectItem>
            <SelectItem value="instituicao">Instituição</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-8">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))
          : paginatedItems.map((item) => (
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
                    Certificações
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
                    Ver Certificado
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {!loading && totalPages > 1 && (
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
            <DialogTitle>Visualizador de Certificado</DialogTitle>
          </DialogHeader>
          <div className="w-full p-2 pt-0">
            {certificateUrl && (
              <iframe
                src={certificateUrl.replace("/view?usp=sharing", "/preview")}
                className="w-full aspect-video border-0 rounded-md"
                title="Certificado"
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}