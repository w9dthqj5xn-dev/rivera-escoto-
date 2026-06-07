"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Trash2, Eye, EyeOff } from "lucide-react";

interface Pub {
  id: string;
  titulo: string;
  fuente: string;
  publicado: boolean;
  creadoEn: Date | string;
}

export default function AdminPublicacionesTable({ publicaciones }: { publicaciones: Pub[] }) {
  const router = useRouter();
  const [lista, setLista] = useState(publicaciones);

  const eliminar = async (id: string) => {
    if (!confirm("¿Eliminar esta publicación?")) return;
    await fetch(`/api/publicaciones/${id}`, { method: "DELETE" });
    setLista((prev) => prev.filter((p) => p.id !== id));
  };

  const togglePublicado = async (id: string, publicado: boolean) => {
    await fetch(`/api/publicaciones/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicado: !publicado }),
    });
    setLista((prev) => prev.map((p) => (p.id === id ? { ...p, publicado: !publicado } : p)));
    router.refresh();
  };

  if (lista.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
        No hay publicaciones aún.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="text-left px-6 py-3 font-semibold text-gray-600">Título</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Fuente</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Fecha</th>
            <th className="text-left px-4 py-3 font-semibold text-gray-600">Estado</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {lista.map((pub) => (
            <tr key={pub.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">{pub.titulo}</td>
              <td className="px-4 py-4 hidden sm:table-cell">
                {pub.fuente === "INSTAGRAM" ? (
                  <span className="flex items-center gap-1 text-pink-500 text-xs font-medium">
                    <Camera size={12} /> Instagram
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Manual</span>
                )}
              </td>
              <td className="px-4 py-4 text-gray-400 text-xs hidden md:table-cell">
                {new Date(pub.creadoEn).toLocaleDateString("es-NI")}
              </td>
              <td className="px-4 py-4">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${pub.publicado ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {pub.publicado ? "Publicado" : "Oculto"}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => togglePublicado(pub.id, pub.publicado)}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                    title={pub.publicado ? "Ocultar" : "Publicar"}
                  >
                    {pub.publicado ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => eliminar(pub.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
