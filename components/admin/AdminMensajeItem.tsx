"use client";
import { useState } from "react";

type Mensaje = {
  id: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  mensaje: string;
  leido?: boolean;
  creadoEn?: string;
};

export default function AdminMensajeItem({ mensaje: m }: { mensaje: Mensaje }) {
  const [leido, setLeido] = useState<boolean>(!!m.leido);
  const [loading, setLoading] = useState(false);
  const fecha = m.creadoEn ? new Date(m.creadoEn).toLocaleDateString("es-ES") : "";

  const marcarLeido = async () => {
    if (leido) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contacto/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.id }),
      });
      if (!res.ok) throw new Error("Error");
      setLeido(true);
    } catch (e) {
      console.error(e);
      alert("No se pudo marcar como leído");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-6 ${!leido ? "border-amber-200 bg-amber-50/20" : "border-gray-100"}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-bold text-gray-900">{m.nombre}</p>
          <p className="text-sm text-gray-500">{m.email}{m.telefono ? ` · ${m.telefono}` : ""}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">{fecha}</p>
          {!leido && (
            <span className="inline-block mt-1 text-xs bg-amber-400 text-gray-900 font-semibold px-2 py-0.5 rounded-full">Nuevo</span>
          )}
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">{m.mensaje}</p>

      <div className="flex gap-2">
        {!leido && (
          <button
            onClick={marcarLeido}
            disabled={loading}
            className="text-sm bg-amber-400 text-gray-900 font-semibold px-3 py-1 rounded-md disabled:opacity-60"
          >
            {loading ? "Marcando..." : "Marcar como leído"}
          </button>
        )}
        {leido && (
          <span className="text-sm text-gray-500 px-3 py-1 rounded-md">Leído</span>
        )}
      </div>
    </div>
  );
}
