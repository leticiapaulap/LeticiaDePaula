"use client";

import { Download, Mail } from "lucide-react";
import { professional } from "@/lib/data";

export function PrintActions() {
  return (
    <div className="print-actions">
      <button className="secondary-action focusable" type="button" onClick={() => window.print()}>
        <Download size={17} />
        Imprimir
      </button>
      <a className="primary-action focusable" href={`mailto:${professional.email}`}>
        <Mail size={17} />
        Contato
      </a>
    </div>
  );
}
