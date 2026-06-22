import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/navigation";
import DocumentLink from "@/components/ui/DocumentLink";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ResearchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("research");

  const supabase = await createClient();
  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("year", { ascending: false });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="pt-8 max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-secondary mb-3">
          Alexis Paúl Vallejo Mancero
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-400 text-sm">{t("subtitle")}</p>
      </div>

      {/* Lista de publicaciones */}
      {!publications || publications.length === 0 ? (
        <p className="text-sm text-gray-400">{t("no_results")}</p>
      ) : (
        <div className="space-y-0">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="flex gap-6 py-7 border-b border-gray-100 group"
            >
              <div className="shrink-0 w-14 text-right pt-0.5">
                <span className="text-sm text-gray-300 font-serif">
                  {pub.year}
                </span>
              </div>

              <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-widest text-secondary mb-2 block">
                    {pub.category || ""}
                  </span>
                  <Link
                    href={`/research/${pub.id}`}
                    className="font-serif text-lg text-gray-900 hover:text-secondary transition-colors leading-snug block"
                  >
                    {locale === "es"
                      ? pub.title_es
                      : pub.title_en || pub.title_es}
                  </Link>
                </div>

                {pub.drive_url && (
                  <DocumentLink href={pub.drive_url} label={t("document")} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
