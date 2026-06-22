import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, FileText, Pencil } from "lucide-react";

export default async function PublicationsAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const { data: publications } = await supabase
    .from("publications")
    .select("*")
    .order("year", { ascending: false });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="text-xs text-gray-400 hover:text-secondary transition-colors mb-3 block"
          >
            ← Panel de administración
          </Link>
          <h1 className="font-serif text-3xl font-light text-gray-900">
            Publicaciones
          </h1>
        </div>
        <Link
          href="/admin/publications/new"
          className="inline-flex items-center gap-2 bg-secondary text-white text-sm px-4 py-2.5 rounded hover:bg-secondary-dark transition-colors"
        >
          <Plus size={15} />
          Nueva publicación
        </Link>
      </div>

      {/* Lista */}
      {!publications || publications.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded">
          <FileText size={32} className="text-gray-200 mx-auto mb-4" />
          <p className="text-sm text-gray-400">No hay publicaciones aún</p>
          <Link
            href="/admin/publications/new"
            className="text-sm text-secondary hover:text-secondary-dark transition-colors mt-2 inline-block"
          >
            Crear la primera
          </Link>
        </div>
      ) : (
        <div className="space-y-0">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="flex items-center justify-between py-5 border-b border-gray-100 group"
            >
              <div className="flex gap-4 items-start flex-1">
                <span className="text-xs text-gray-300 font-serif w-12 text-right shrink-0 pt-0.5">
                  {pub.year}
                </span>
                <div>
                  <span className="text-xs uppercase tracking-widest text-secondary mb-1 block">
                    {pub.category || "Sin categoría"}
                  </span>
                  <h3 className="font-serif text-base text-gray-900 leading-snug">
                    {pub.title_es || "Sin título"}
                  </h3>
                </div>
              </div>
              <Link
                href={`/admin/publications/${pub.id}`}
                className="shrink-0 inline-flex items-center gap-2 text-xs text-gray-400 hover:text-secondary transition-colors ml-4"
              >
                <Pencil size={13} />
                Editar
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
