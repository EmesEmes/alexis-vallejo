"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Save, X } from "lucide-react";

export default function NewPublicationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title_es: "",
    title_en: "",
    body_es: "",
    body_en: "",
    category: "",
    year: new Date().getFullYear(),
    drive_url: "",
    cover_url: "",
  });

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `publications/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    return data.publicUrl;
  };

  const uploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    setForm((prev) => ({ ...prev, cover_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.from("publications").insert([
      {
        title_es: form.title_es,
        title_en: form.title_en,
        body_es: form.body_es,
        body_en: form.body_en,
        category: form.category,
        year: form.year,
        drive_url: form.drive_url || null,
        cover_url: form.cover_url || null,
      },
    ]);

    // if (error) {
    //   setError("Error al guardar la publicación");
    //   setLoading(false);
    //   return;
    // }
    if (error) {
      console.error("Supabase error:", error);
      setError(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    router.push("/admin/publications");
  };

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => router.push("/admin/publications")}
          className="text-xs text-gray-400 hover:text-secondary transition-colors mb-3 block cursor-pointer"
        >
          ← Publicaciones
        </button>
        <h1 className="font-serif text-3xl font-light text-gray-900">
          Nueva publicación
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Información básica */}
        <div className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Información básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400">
                Categoría
              </label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="ej: Tesis doctoral, Maestría..."
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-widest text-gray-400">
                Año
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm({ ...form, year: parseInt(e.target.value) })
                }
                className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Enlace al documento (opcional)
            </label>
            <input
              type="url"
              value={form.drive_url}
              onChange={(e) => setForm({ ...form, drive_url: e.target.value })}
              placeholder="https://..."
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Imagen de portada (opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadCover}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-1.5 file:px-3 file:rounded file:border file:border-secondary file:text-xs file:text-secondary file:bg-transparent hover:file:bg-secondary hover:file:text-white file:transition-colors file:cursor-pointer"
            />
            {form.cover_url && (
              <img
                src={form.cover_url}
                alt="Portada"
                className="mt-2 h-24 w-auto rounded object-cover"
              />
            )}
          </div>
        </div>

        {/* Contenido en español */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Contenido en español
          </h2>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Título
            </label>
            <input
              type="text"
              value={form.title_es}
              onChange={(e) => setForm({ ...form, title_es: e.target.value })}
              required
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">
              Contenido
            </label>
            <RichTextEditor
              content={form.body_es}
              onChange={(val) => setForm({ ...form, body_es: val })}
              onImageUpload={uploadImage}
            />
          </div>
        </div>

        {/* Contenido en inglés */}
        <div className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Contenido en inglés
          </h2>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Title
            </label>
            <input
              type="text"
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">
              Content
            </label>
            <RichTextEditor
              content={form.body_en}
              onChange={(val) => setForm({ ...form, body_en: val })}
              onImageUpload={uploadImage}
            />
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        {/* Botones */}
        <div className="flex gap-4 pb-8">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-secondary text-white text-sm px-5 py-2.5 rounded hover:bg-secondary-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} />
            {loading ? "Guardando..." : "Guardar publicación"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/publications")}
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-500 text-sm px-5 py-2.5 rounded hover:border-secondary hover:text-secondary transition-colors cursor-pointer"
          >
            <X size={14} />
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
