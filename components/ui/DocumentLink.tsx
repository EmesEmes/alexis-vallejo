"use client";

import { FileText } from "lucide-react";

type Props = {
  href: string;
  label: string;
};

export default function DocumentLink({ href, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="shrink-0 inline-flex items-center gap-2 text-xs text-gray-400 border border-gray-200 rounded px-3 py-1.5 hover:border-secondary hover:text-secondary transition-colors self-start"
    >
      <FileText size={13} />
      {label}
    </a>
  );
}
