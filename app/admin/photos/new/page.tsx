"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, X, Upload } from "lucide-react";

export default function NewPhotoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title_es: "",
    title_en: "",
    collection: "",
    featured: false,
    taken_at: "",
    url: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `photos/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("images").upload(path, file);

    if (error) {
      setError("Error al subir la imagen");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(path);
    setForm((prev) => ({ ...prev, url: data.publicUrl }));
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url) {
      setError("Debes subir una fotografía");
      return;
    }

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.from("photos").insert([
      {
        title_es: form.title_es || null,
        title_en: form.title_en || null,
        collection: form.collection || null,
        featured: form.featured,
        taken_at: form.taken_at || null,
        url: form.url,
      },
    ]);

    if (error) {
      setError(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    router.push("/admin/photos");
  };

  return (
    <div className="space-y-8">
      <div>
        <button
          onClick={() => router.push("/admin/photos")}
          className="text-xs text-gray-400 hover:text-secondary transition-colors mb-3 block cursor-pointer"
        >
          ← Fotografías
        </button>
        <h1 className="font-serif text-3xl font-light text-gray-900">
          Subir fotografía
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Upload */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Fotografía
          </label>

          {form.url ? (
            <div className="relative w-full max-w-md">
              <img
                src={form.url}
                alt="Preview"
                className="w-full rounded object-cover max-h-80"
              />
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, url: "" }))}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:text-secondary transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full max-w-md h-52 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-secondary transition-colors">
              <Upload size={24} className="text-gray-300 mb-3" />
              <p className="text-sm text-gray-400">
                {uploading ? "Subiendo..." : "Haz clic para subir una foto"}
              </p>
              <p className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          )}
        </div>

        {/* Información */}
        <div className="space-y-6 max-w-md">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Información (opcional)
          </h2>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Título en español
            </label>
            <input
              type="text"
              value={form.title_es}
              onChange={(e) => setForm({ ...form, title_es: e.target.value })}
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Title in English
            </label>
            <input
              type="text"
              value={form.title_en}
              onChange={(e) => setForm({ ...form, title_en: e.target.value })}
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Colección
            </label>
            <input
              type="text"
              value={form.collection}
              onChange={(e) => setForm({ ...form, collection: e.target.value })}
              placeholder="ej: Ecuador, FAO, Naturaleza..."
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Fecha de toma
            </label>
            <input
              type="date"
              value={form.taken_at}
              onChange={(e) => setForm({ ...form, taken_at: e.target.value })}
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-secondary"
            />
            <span className="text-sm text-gray-600">
              Destacar en la página de inicio
            </span>
          </label>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="flex gap-4 pb-8">
          <button
            type="submit"
            disabled={loading || uploading}
            className="inline-flex items-center gap-2 bg-secondary text-white text-sm px-5 py-2.5 rounded hover:bg-secondary-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save size={14} />
            {loading ? "Guardando..." : "Guardar fotografía"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/photos")}
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
