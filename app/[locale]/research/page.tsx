import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

export default function ResearchPage() {
  const t = useTranslations("research");

  const publications = [
    {
      id: 1,
      year: 2024,
      type: "doctoral",
      title:
        "Sostenibilidad territorial en zonas rurales andinas: un enfoque desde la agroecología",
      driveUrl: "#",
    },
    {
      id: 2,
      year: 2023,
      type: "supervised",
      title:
        "Impacto de las políticas agrarias en la seguridad alimentaria de comunidades indígenas",
      driveUrl: "#",
    },
    {
      id: 3,
      year: 2023,
      type: "doctoral",
      title:
        "Modelos de gobernanza territorial para el desarrollo sostenible en América Latina",
      driveUrl: null,
    },
    {
      id: 4,
      year: 2022,
      type: "supervised",
      title:
        "Análisis comparativo de sistemas agroforestales en la región amazónica",
      driveUrl: "#",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pt-8 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-secondary mb-3">
          Alexis Vallejo
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-400 text-sm">{t("subtitle")}</p>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {(["filter_all", "filter_doctoral", "filter_supervised"] as const).map(
          (key) => (
            <button
              key={key}
              className="text-xs uppercase tracking-widest px-4 py-1.5 rounded border border-gray-200 text-gray-500 hover:border-secondary hover:text-secondary transition-colors cursor-pointer first:border-secondary first:text-secondary"
            >
              {t(key)}
            </button>
          ),
        )}
      </div>

      {/* Lista de publicaciones */}
      <div className="space-y-0">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="flex gap-6 py-7 border-b border-gray-100 group"
          >
            {/* Año */}
            <div className="shrink-0 w-14 text-right pt-0.5">
              <span className="text-sm text-gray-300 font-serif">
                {pub.year}
              </span>
            </div>

            {/* Contenido */}
            <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-widest text-secondary mb-2 block">
                  {pub.type === "doctoral"
                    ? t("filter_doctoral")
                    : t("filter_supervised")}
                </span>
                <h2 className="font-serif text-lg text-gray-900 group-hover:text-secondary transition-colors leading-snug">
                  {pub.title}
                </h2>
              </div>

              {/* Enlace a Drive */}
              {pub.driveUrl && (
                <a
                  href={pub.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 text-xs text-gray-400 border border-gray-200 rounded px-3 py-1.5 hover:border-secondary hover:text-secondary transition-colors self-start"
                >
                  <FileText size={13} />
                  {t("document")}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
