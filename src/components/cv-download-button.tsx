"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Download, ChevronDown, FileText, FileStack } from "lucide-react"

type CvDownloadButtonProps = {
  locale: string
  label: string
  compactLabel: string
  fullLabel: string
}

export function CvDownloadButton({
  locale,
  label,
  compactLabel,
  fullLabel,
}: CvDownloadButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <Download size={18} />
          {label}
          <ChevronDown size={16} className="opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <a href={`/api/cv?lang=${locale}`} rel="noopener">
            <FileText size={16} />
            {compactLabel}
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href={`/api/cv?lang=${locale}&format=full`} rel="noopener">
            <FileStack size={16} />
            {fullLabel}
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
