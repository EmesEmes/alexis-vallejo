import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Mail, Phone } from "lucide-react";
import HeroSection from "@/components/layout/HeroSection";
import ScrollReveal from "@/components/ui/ScrollReveal";

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tResearch = await getTranslations("research");
  const tPhotography = await getTranslations("photography");
  const tFooter = await getTranslations("footer");

  const contactLinks = [
    {
      icon: Mail,
      label: tFooter("email"),
      href: `mailto:${tFooter("email")}`,
    },
    {
      icon: Phone,
      label: tFooter("phone"),
      href: `tel:${tFooter("phone").replace(/\s/g, "")}`,
    },
    {
      icon: LinkedInIcon,
      label: tFooter("linkedin"),
      href: `https://${tFooter("linkedin").replace(/^https?:\/\//, "")}`,
    },
  ];

  return (
    <div>
      {/* Hero full screen */}
      <HeroSection
        name="Alexis Paúl Vallejo Mancero"
        bio={t("bio")}
        ctaResearch={t("cta_research")}
        ctaAbout={t("cta_about")}
      />

      {/* Resto del contenido */}
      <div className="max-w-5xl mx-auto px-6 py-24 space-y-24">
        {/* Investigación reciente */}
        <ScrollReveal>
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-light text-gray-900">
                {tResearch("title")}
              </h2>
              <Link
                href="/research"
                className="text-sm text-secondary hover:text-secondary-dark transition-colors inline-flex items-center gap-1"
              >
                {tResearch("filter_all")}
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex gap-6 py-6 border-b border-gray-100 group"
                >
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="text-sm text-gray-300 font-serif">
                      2024
                    </span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs uppercase tracking-widest text-secondary mb-2 block">
                      Doctorado
                    </span>
                    <h3 className="font-serif text-lg text-gray-900 group-hover:text-secondary transition-colors leading-snug">
                      Título de la publicación {i} — ejemplo de investigación en
                      sostenibilidad territorial
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Divider */}
        <div className="w-12 h-px bg-secondary" />

        {/* Fotografía preview */}
        <ScrollReveal>
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-light text-gray-900">
                {tPhotography("title")}
              </h2>
              <Link
                href="/photography"
                className="text-sm text-secondary hover:text-secondary-dark transition-colors inline-flex items-center gap-1"
              >
                {tResearch("filter_all")}
                <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Contacto */}
        <ScrollReveal>
          <section className="pb-8">
            <div className="w-12 h-px bg-secondary mb-12" />
            <h2 className="font-serif text-2xl font-light text-gray-900 mb-8">
              Contacto
            </h2>
            <div className="flex flex-col gap-4 max-w-sm">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-4 py-4 border-b border-gray-100 group"
                  >
                    <span className="text-gray-300 group-hover:text-secondary transition-colors flex-shrink-0">
                      <Icon size={14} />
                    </span>
                    <span className="text-sm text-gray-600 group-hover:text-secondary transition-colors">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
