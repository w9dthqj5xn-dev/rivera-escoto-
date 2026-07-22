"use client";
import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Link as LinkIcon } from "lucide-react";

interface AdminInstagramSyncProps {
  authUrl?: string;
}

export default function AdminInstagramSync({ authUrl }: AdminInstagramSyncProps) {
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [accessToken, setAccessToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [loadingCreds, setLoadingCreds] = useState(false);

  const credentialsSaved = useMemo(() => Boolean(accessToken || userId), [accessToken, userId]);

  useEffect(() => {
    async function fetchCreds() {
      setLoadingCreds(true);
      try {
        const res = await fetch("/api/instagram/credentials");
        if (!res.ok) return;
        const data = await res.json();
        if (data.accessToken) setAccessToken(data.accessToken);
        if (data.userId) setUserId(data.userId);
      } catch {
        // ignore
      } finally {
        setLoadingCreds(false);
      }
    }
    fetchCreds();
  }, []);

  const saveCreds = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/instagram/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error guardando credenciales");
      setResultado(data.message || "Guardado");
      setError("");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setSaving(false);
    }
  };

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
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Estado de conexión</p>
            <p className="text-sm text-gray-600 mt-1">
              {loadingCreds ? "Cargando credenciales..." : credentialsSaved ? "Instagram enlazado actualmente." : "No hay credenciales guardadas."}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
            <LinkIcon size={14} /> {credentialsSaved ? "Conectado" : "Desconectado"}
          </div>
        </div>
        {credentialsSaved && !loadingCreds && (
          <div className="mt-3 text-xs text-gray-500">
            Token: <span className="font-mono">{accessToken ? `${accessToken.slice(0, 8)}...` : "-"}</span>
            <br />
            User ID: <span className="font-mono">{userId || "-"}</span>
          </div>
        )}
      </div>

      {authUrl ? (
        <div className="rounded-xl border border-pink-200 bg-pink-50 p-4">
          <p className="text-sm font-semibold text-pink-700 mb-3">Conectar con Instagram</p>
          <a
            href={authUrl}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
          >
            Iniciar sesión en Instagram
          </a>
          <p className="mt-3 text-sm text-gray-600">
            Si ya configuraste tu app de Instagram, haz clic aquí para autorizar el acceso y enlazar la cuenta.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
          Configura <code className="bg-gray-100 px-1 rounded">INSTAGRAM_APP_ID</code> e <code className="bg-gray-100 px-1 rounded">INSTAGRAM_APP_SECRET</code> en <code className="bg-gray-100 px-1 rounded">.env</code> para enlazar Instagram con un botón.
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm text-gray-600">INSTAGRAM_ACCESS_TOKEN</label>
        <input
          value={accessToken}
          onChange={(e) => setAccessToken(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Ingresar access token"
        />

        <label className="text-sm text-gray-600 mt-2">INSTAGRAM_USER_ID</label>
        <input
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Ingresar user id"
        />

        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={saveCreds}
            disabled={saving}
            className="bg-amber-500 text-white px-4 py-2 rounded-md font-semibold disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar credenciales"}
          </button>
          <button
            onClick={() => {
              setAccessToken("");
              setUserId("");
            }}
            className="border px-4 py-2 rounded-md"
          >
            Limpiar
          </button>
        </div>
      </div>

      <div className="pt-4 border-t">
        <button
          onClick={sincronizar}
          disabled={loading}
          className="flex items-center gap-2 bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          {loading ? "Sincronizando..." : "Sincronizar ahora"}
        </button>
      </div>

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
