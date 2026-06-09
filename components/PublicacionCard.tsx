import Image from "next/image";
import Link from "next/link";
import { Calendar, Camera } from "lucide-react";

interface PublicacionCardProps {
  id: string;
  titulo: string;
  contenido?: string | null;
  imagen?: string | null;
  fuente: "MANUAL" | "INSTAGRAM";
  instagramUrl?: string | null;
  creadoEn: Date | string;
}

export default function PublicacionCard({
  titulo,
  contenido,
  imagen,
  fuente,
  instagramUrl,
  creadoEn,
}: PublicacionCardProps) {
  const fecha = new Date(creadoEn).toLocaleDateString("es-NI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 group flex flex-col h-full">
      {/* Imagen */}
      {imagen && (
        <div className="relative h-52 w-full overflow-hidden bg-gray-100 shrink-0">
          <Image
            src={imagen}
            alt={titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {fuente === "INSTAGRAM" && (
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-pink-600 rounded-full p-1.5 shadow-sm">
              <Camera size={13} />
            </span>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Fuente badge */}
        {fuente === "INSTAGRAM" && !imagen && (
          <div className="flex items-center gap-1 text-pink-500 text-xs font-medium mb-2">
            <Camera size={12} /> Instagram
          </div>
        )}

        <h3 className="font-bold text-gray-900 text-base mb-2 line-clamp-2 tracking-tight leading-snug">{titulo}</h3>

        {contenido && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">{contenido}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar size={12} /> {fecha}
          </span>

          {fuente === "INSTAGRAM" && instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-600 hover:text-amber-700 font-semibold hover:underline underline-offset-2 transition-all"
            >
              Ver en Instagram →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
