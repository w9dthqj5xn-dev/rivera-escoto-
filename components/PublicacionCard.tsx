import Image from "next/image";
import Link from "next/link";
import { Calendar, Camera, PlayCircle } from "lucide-react";

interface PublicacionCardProps {
  id: string;
  titulo: string;
  contenido?: string | null;
  imagen?: string | null;
  videoUrl?: string | null;
  youtubeUrl?: string | null;
  fuente: "MANUAL" | "INSTAGRAM";
  instagramUrl?: string | null;
  creadoEn: Date | string;
}

function isYouTubeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "").toLowerCase();
    return host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com");
  } catch {
    return false;
  }
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "").toLowerCase();
    let id: string | null = null;

    if (host === "youtu.be") {
      id = parsed.pathname.replace("/", "").trim();
    }

    if (!id && host.endsWith("youtube.com")) {
      if (parsed.pathname === "/watch") {
        id = parsed.searchParams.get("v");
      }

      if (!id && parsed.pathname.startsWith("/shorts/")) {
        id = parsed.pathname.split("/shorts/")[1]?.split("/")[0] || null;
      }

      if (!id && parsed.pathname.startsWith("/embed/")) {
        id = parsed.pathname.split("/embed/")[1]?.split("/")[0] || null;
      }

      if (!id && parsed.pathname.startsWith("/live/")) {
        id = parsed.pathname.split("/live/")[1]?.split("/")[0] || null;
      }
    }

    if (!id && host.endsWith("youtube-nocookie.com") && parsed.pathname.startsWith("/embed/")) {
      id = parsed.pathname.split("/embed/")[1]?.split("/")[0] || null;
    }

    if (!id) {
      const candidate = url.match(/(?:v=|\/shorts\/|\/embed\/|youtu\.be\/|\/live\/)([A-Za-z0-9_-]{11})/);
      if (candidate?.[1]) {
        id = candidate[1];
      }
    }

    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

export default function PublicacionCard({
  titulo,
  contenido,
  imagen,
  videoUrl,
  youtubeUrl,
  fuente,
  instagramUrl,
  creadoEn,
}: PublicacionCardProps) {
  const fecha = new Date(creadoEn).toLocaleDateString("es-NI", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const youtubeCandidateUrl = [youtubeUrl, videoUrl, imagen].find((value) => typeof value === "string" && isYouTubeUrl(value));
  const youtubeEmbedUrl = youtubeCandidateUrl ? getYouTubeEmbedUrl(youtubeCandidateUrl) : null;
  const showVideo = Boolean(youtubeEmbedUrl || videoUrl);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 group flex flex-col h-full">
      {youtubeEmbedUrl && (
        <div className="relative w-full bg-black shrink-0 aspect-video">
          <iframe
            src={youtubeEmbedUrl}
            title={titulo}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      )}

      {!youtubeEmbedUrl && videoUrl && (
        <div className="relative w-full bg-black shrink-0 aspect-video">
          <video controls className="h-full w-full" preload="metadata">
            <source src={videoUrl} />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      )}

      {!showVideo && imagen && (
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

        {fuente === "MANUAL" && showVideo && (
          <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold mb-2">
            <PlayCircle size={12} /> Video
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

          {fuente === "MANUAL" && youtubeCandidateUrl && (
            <a
              href={youtubeCandidateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-600 hover:text-amber-700 font-semibold hover:underline underline-offset-2 transition-all"
            >
              Ver en YouTube →
            </a>
          )}

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
