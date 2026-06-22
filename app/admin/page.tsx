"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-secondary mb-3">
            Panel de administración
          </p>
          <h1 className="font-serif text-3xl font-light text-gray-900">
            Iniciar sesión
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-widest text-gray-400">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-200 py-2 text-sm text-gray-900 bg-transparent focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white text-sm py-2.5 rounded hover:bg-secondary-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
