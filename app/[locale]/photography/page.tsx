import { useTranslations } from "next-intl";

export default function PhotographyPage() {
  const t = useTranslations("photography");

  // Placeholder fotos con diferentes proporciones para simular una galería real
  const photos = [
    { id: 1, aspect: "aspect-square" },
    { id: 2, aspect: "aspect-[3/4]" },
    { id: 3, aspect: "aspect-square" },
    { id: 4, aspect: "aspect-[3/4]" },
    { id: 5, aspect: "aspect-square" },
    { id: 6, aspect: "aspect-square" },
    { id: 7, aspect: "aspect-[3/4]" },
    { id: 8, aspect: "aspect-square" },
    { id: 9, aspect: "aspect-[3/4]" },
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

      {/* Galería */}
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`${photo.aspect} w-full bg-gray-100 rounded overflow-hidden break-inside-avoid mb-3 group cursor-pointer`}
          >
            <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
