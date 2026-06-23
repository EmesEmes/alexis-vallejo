"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Ocultar/mostrar navbar según dirección del scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
        setIsOpen(false);
      } else {
        setVisible(true);
      }

      // Cambiar estilo cuando se hace scroll
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  // En el hero (home) el navbar es transparente, luego se vuelve sólido
  const isHome = pathname === "/";

  return (
    <motion.header
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-[#fafaf8] border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className={`font-serif text-xl font-medium tracking-wide transition-colors ${
            scrolled || !isHome
              ? "text-gray-900 hover:text-secondary"
              : "text-white hover:text-white/80"
          }`}
        >
          Alexis Vallejo
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                scrolled || !isHome
                  ? "text-gray-600 hover:text-secondary"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              scrolled || !isHome
                ? "text-secondary hover:text-secondary-dark"
                : "text-white hover:text-white/80"
            }`}
          >
            {t("about")}
          </Link>
          <button
            onClick={switchLocale}
            className={`text-sm font-medium border rounded px-2 py-0.5 transition-colors cursor-pointer ${
              scrolled || !isHome
                ? "text-secondary border-secondary hover:bg-secondary hover:text-white"
                : "text-white border-white/60 hover:bg-white/10"
            }`}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={switchLocale}
            className={`text-sm font-medium border rounded px-2 py-0.5 transition-colors cursor-pointer ${
              scrolled || !isHome
                ? "text-secondary border-secondary hover:bg-secondary hover:text-white"
                : "text-white border-white/60 hover:bg-white/10"
            }`}
          >
            {locale === "es" ? "EN" : "ES"}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`transition-colors ${
              scrolled || !isHome
                ? "text-gray-600 hover:text-secondary"
                : "text-white hover:text-white/80"
            }`}
            aria-label="Menú"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-100 bg-[#fafaf8] overflow-hidden"
          >
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
              <div className="w-full h-px bg-gray-100" />
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-secondary py-1"
              >
                {t("about")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
