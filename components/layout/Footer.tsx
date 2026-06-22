import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";

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

export default function Footer() {
  const t = useTranslations("footer");

  const links = [
    {
      icon: Mail,
      label: t("email"),
      href: `mailto:${t("email")}`,
    },
    {
      icon: Phone,
      label: t("phone"),
      href: `tel:${t("phone").replace(/\s/g, "")}`,
    },
    {
      icon: LinkedInIcon,
      label: t("linkedin"),
      href: `https://${t("linkedin")}`,
    },
  ];

  return (
    <footer className="w-full border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <p className="text-sm text-gray-400 font-serif">
          © {new Date().getFullYear()} Alexis Vallejo
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {links.map((link) => {
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
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-secondary transition-colors"
              >
                <span className="shrink-0">
                  <Icon size={14} />
                </span>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
