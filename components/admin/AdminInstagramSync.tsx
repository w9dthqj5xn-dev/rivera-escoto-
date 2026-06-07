"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function AdminInstagramSync() {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<string>("");
  const [error, setError] = useState<string>("");

  const sincronizar = async () => {
    setLoading(true);
    setResultado("");
    setError("");

    try {
      const res = await fetch("/api/instagram/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al sincronizar");
      setResultado(data.message);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={sincronizar}
        disabled={loading}
        className="flex items-center gap-2 bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        {loading ? "Sincronizando..." : "Sincronizar ahora"}
      </button>

      {resultado && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-green-700 text-sm">
          ✓ {resultado}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
