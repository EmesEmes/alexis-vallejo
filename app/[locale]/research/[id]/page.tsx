import { getTranslations, setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { FileText, ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function PublicationPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("research");

  const supabase = await createClient();
  const { data: pub } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .single();

  if (!pub) notFound();

  const title = locale === "es" ? pub.title_es : pub.title_en || pub.title_es;
  const body = locale === "es" ? pub.body_es : pub.body_en || pub.body_es;

  return (
    <div className="space-y-10 max-w-3xl">
      {/* Volver */}
      <div className="pt-8">
        <Link
          href="/research"
          className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-secondary transition-colors"
        >
          <ArrowLeft size={13} />
          {t("title")}
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-widest text-secondary">
            {pub.category || ""}
          </span>
          <span className="text-xs text-gray-300 font-serif">{pub.year}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-light text-gray-900 leading-snug">
          {title}
        </h1>

        {/* Imagen de portada */}
        {pub.cover_url && (
          <img
            src={pub.cover_url}
            alt={title}
            className="w-full h-64 object-cover rounded mt-4"
          />
        )}
      </div>

      {/* Enlace al documento */}
      {pub.drive_url && (
        <a
          href={pub.drive_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-secondary border border-secondary rounded px-4 py-2 hover:bg-secondary hover:text-white transition-colors"
        >
          <FileText size={14} />
          {t("document")}
        </a>
      )}

      {/* Contenido enriquecido */}
      {body && (
        <div
          className="prose prose-gray max-w-none font-sans text-gray-700 prose-headings:font-serif prose-headings:font-light prose-a:text-secondary prose-img:rounded"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </div>
  );
}
