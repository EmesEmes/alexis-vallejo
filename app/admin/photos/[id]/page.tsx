"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Save, X, Trash2, Upload } from "lucide-react";

export default function EditPhotoPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    const fetchPhoto = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("photos")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setForm({
          title_es: data.title_es || "",
          title_en: data.title_en || "",
          collection: data.collection || "",
          featured: data.featured || false,
          taken_at: data.taken_at || "",
          url: data.url || "",
        });
      }
      setFetching(false);
    };

    fetchPhoto();
  }, [id]);

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
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase
      .from("photos")
      .update({
        title_es: form.title_es || null,
        title_en: form.title_en || null,
        collection: form.collection || null,
        featured: form.featured,
        taken_at: form.taken_at || null,
        url: form.url,
      })
      .eq("id", id);

    if (error) {
      setError(`Error: ${error.message}`);
      setLoading(false);
      return;
    }

    router.push("/admin/photos");
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta fotografía?"))
      return;
    const supabase = createClient();
    await supabase.from("photos").delete().eq("id", id);
    router.push("/admin/photos");
  };

  if (fetching) {
    return (
      <div className="pt-8">
        <p className="text-sm text-gray-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.push("/admin/photos")}
            className="text-xs text-gray-400 hover:text-secondary transition-colors mb-3 block cursor-pointer"
          >
            ← Fotografías
          </button>
          <h1 className="font-serif text-3xl font-light text-gray-900">
            Editar fotografía
          </h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 text-xs text-red-400 hover:text-red-600 transition-colors cursor-pointer"
        >
          <Trash2 size={13} />
          Eliminar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Foto actual */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-widest text-gray-400">
            Fotografía
          </label>

          {form.url && (
            <img
              src={form.url}
              alt="Preview"
              className="w-full max-w-md rounded object-cover max-h-80"
            />
          )}

          <label className="inline-flex items-center gap-2 text-xs text-gray-400 border border-gray-200 rounded px-3 py-2 cursor-pointer hover:border-secondary hover:text-secondary transition-colors">
            <Upload size={13} />
            {uploading ? "Subiendo..." : "Reemplazar imagen"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Información */}
        <div className="space-y-6 max-w-md">
          <h2 className="text-xs uppercase tracking-widest text-gray-400">
            Información
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
            {loading ? "Guardando..." : "Guardar cambios"}
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
