import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Camera, LogOut } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  return (
    <div className="space-y-12">
      <div className="pt-8 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-secondary mb-3">
            Panel de administración
          </p>
          <h1 className="font-serif text-4xl font-light text-gray-900">
            Bienvenido, Alexis
          </h1>
        </div>

        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-secondary transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/publications"
          className="group border border-gray-100 rounded p-8 hover:border-secondary transition-colors"
        >
          <FileText
            size={24}
            className="text-gray-300 group-hover:text-secondary transition-colors mb-4"
          />
          <h2 className="font-serif text-xl font-light text-gray-900 mb-1">
            Publicaciones
          </h2>
          <p className="text-xs text-gray-400">
            Gestionar investigaciones y estudios
          </p>
        </Link>

        <Link
          href="/admin/photos"
          className="group border border-gray-100 rounded p-8 hover:border-secondary transition-colors"
        >
          <Camera
            size={24}
            className="text-gray-300 group-hover:text-secondary transition-colors mb-4"
          />
          <h2 className="font-serif text-xl font-light text-gray-900 mb-1">
            Fotografías
          </h2>
          <p className="text-xs text-gray-400">Gestionar galería de fotos</p>
        </Link>
      </div>
    </div>
  );
}
