"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/" as const, label: t("home") },
    { href: "/research" as const, label: t("research") },
    { href: "/photography" as const, label: t("photography") },
  ];

  const switchLocale = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    router.replace(pathname, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-100 bg-[#fafaf8]">
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="font-serif text-xl font-medium tracking-wide text-gray-900 hover:text-secondary transition-colors"
        >
          Alexis Vallejo
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-secondary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={switchLocale}
            className="text-sm font-medium text-secondary border border-secondary rounded px-2 py-0.5 hover:bg-secondary hover:text-white transition-colors cursor-pointer"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
        </div>

        {/* Mobile: idioma + hamburguesa */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={switchLocale}
            className="text-sm font-medium text-secondary border border-secondary rounded px-2 py-0.5 hover:bg-secondary hover:text-white transition-colors cursor-pointer"
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-secondary transition-colors"
            aria-label="Menú"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-[#fafaf8]">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-gray-600 hover:text-secondary transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
