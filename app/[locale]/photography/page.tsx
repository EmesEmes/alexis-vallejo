import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PhotoGallery from "@/components/ui/PhotoGallery";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PhotographyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("photography");

  const supabase = await createClient();
  const { data: photos } = await supabase
    .from("photos")
    .select("id, url, title_es, title_en")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12 max-w-5xl mx-auto px-6 py-24">
      <ScrollReveal>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-secondary mb-3">
            Alexis Paúl Vallejo Mancero
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-400 text-sm">{t("subtitle")}</p>
        </div>
      </ScrollReveal>

      {!photos || photos.length === 0 ? (
        <p className="text-sm text-gray-400">No hay fotografías aún</p>
      ) : (
        <PhotoGallery photos={photos} locale={locale} />
      )}
    </div>
  );
}
