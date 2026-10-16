"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useExperienceSelection } from "@/components/experience-provider";

export function ProjectReturnLink() {
  const { galleryReturnHref } = useExperienceSelection();
  return <Link className="text-action focusable back-link" href={galleryReturnHref}><ArrowLeft size={16} aria-hidden="true" />Voltar aos projetos</Link>;
}
