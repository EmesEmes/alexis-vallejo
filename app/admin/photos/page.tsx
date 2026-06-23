import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Camera } from "lucide-react";

export default async function PhotosAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin");

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

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
            Fotografías
          </h1>
        </div>
        <Link
          href="/admin/photos/new"
          className="inline-flex items-center gap-2 bg-secondary text-white text-sm px-4 py-2.5 rounded hover:bg-secondary-dark transition-colors"
        >
          <Plus size={15} />
          Subir foto
        </Link>
      </div>

      {/* Grid */}
      {!photos || photos.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-200 rounded">
          <Camera size={32} className="text-gray-200 mx-auto mb-4" />
          <p className="text-sm text-gray-400">No hay fotografías aún</p>
          <Link
            href="/admin/photos/new"
            className="text-sm text-secondary hover:text-secondary-dark transition-colors mt-2 inline-block"
          >
            Subir la primera
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/admin/photos/${photo.id}`}
              className="group relative aspect-square bg-gray-100 rounded overflow-hidden"
            >
              <img
                src={photo.url}
                alt={photo.title_es || ""}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end p-3">
                <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity font-medium truncate">
                  {photo.title_es || "Sin título"}
                </p>
              </div>
              {photo.featured && (
                <div className="absolute top-2 right-2 bg-secondary text-white text-xs px-1.5 py-0.5 rounded">
                  ★
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
