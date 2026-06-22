import { useTranslations } from "next-intl";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const education = t.raw("education") as {
    degree: string;
    institution: string;
    year: string;
  }[];

  const experience = t.raw("experience") as {
    role: string;
    organization: string;
    year: string;
    description: string;
  }[];

  return (
    <div className="space-y-16">
      {/* Header con foto */}
      <section className="pt-8 flex flex-col md:flex-row md:items-start gap-10">
        <div className="shrink-0">
          <div className="w-36 h-36 rounded-full overflow-hidden border border-gray-100">
            <Image
              src="/alexis.jpg"
              alt="Alexis Paúl Vallejo Mancero"
              width={144}
              height={144}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-secondary mb-3">
            Alexis Paúl Vallejo Mancero
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-400 text-sm mb-6">{t("subtitle")}</p>
          <a
            href="https://scholar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-secondary border border-secondary rounded px-4 py-2 hover:bg-secondary hover:text-white transition-colors"
          >
            <ExternalLink size={13} />
            {t("scholar_label")}
          </a>
        </div>
      </section>

      {/* Formación académica */}
      <section>
        <h2 className="font-serif text-2xl font-light text-gray-900 mb-8">
          {t("education_title")}
        </h2>
        <div className="space-y-0">
          {education.map((item, i) => (
            <div key={i} className="flex gap-6 py-6 border-b border-gray-100">
              <div className="shrink-0 w-28 text-right pt-0.5">
                <span className="text-xs text-gray-300">{item.year}</span>
              </div>
              <div>
                <h3 className="font-serif text-base text-gray-900 leading-snug mb-1">
                  {item.degree}
                </h3>
                <p className="text-xs text-gray-400">{item.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experiencia profesional */}
      <section className="pb-8">
        <h2 className="font-serif text-2xl font-light text-gray-900 mb-8">
          {t("experience_title")}
        </h2>
        <div className="space-y-0">
          {experience.map((item, i) => (
            <div key={i} className="flex gap-6 py-6 border-b border-gray-100">
              <div className="shrink-0 w-28 text-right pt-0.5">
                <span className="text-xs text-gray-300">{item.year}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-base text-gray-900 leading-snug mb-1">
                  {item.role}
                </h3>
                <p className="text-xs text-secondary mb-2">
                  {item.organization}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
