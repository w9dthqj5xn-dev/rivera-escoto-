import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db, docToData, docsToData } from "@/lib/firebase";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
import type { Publicacion } from "@/lib/types";

const schema = z.object({
  titulo: z.string().min(1),
  contenido: z.string().optional(),
  imagen: z.string().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
  slug: z.string().min(1),
  publicado: z.boolean().default(true),
});

function isYouTubeUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace("www.", "").toLowerCase();
    return host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com");
  } catch {
    return false;
  }
}

export async function GET() {
  if (!db) {
    return NextResponse.json({ error: "Base de datos no configurada" }, { status: 500 });
  }

  try {
    const snap = await db
      .collection("publicaciones")
      .orderBy("creadoEn", "desc")
      .get();
    const publicaciones = docsToData<Publicacion>(snap).filter((pub) => pub.publicado === true);
    return NextResponse.json(publicaciones);
  } catch {
    return NextResponse.json({ error: "Error al obtener publicaciones" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!db) {
    return NextResponse.json({ error: "Base de datos no configurada" }, { status: 500 });
  }

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const imageValue = data.imagen || null;
    const rawVideoValue = data.videoUrl || null;
    const rawYoutubeValue = data.youtubeUrl || null;

    const inferredYoutubeUrl = rawYoutubeValue
      || (rawVideoValue && isYouTubeUrl(rawVideoValue) ? rawVideoValue : null)
      || (imageValue && isYouTubeUrl(imageValue) ? imageValue : null);

    const normalizedVideoUrl = rawVideoValue && !isYouTubeUrl(rawVideoValue) ? rawVideoValue : null;
    const normalizedImageUrl = imageValue && !isYouTubeUrl(imageValue) ? imageValue : null;

    const ref = await db.collection("publicaciones").add({
      titulo: data.titulo,
      contenido: data.contenido ?? null,
      imagen: normalizedImageUrl,
      videoUrl: normalizedVideoUrl,
      youtubeUrl: inferredYoutubeUrl,
      slug: data.slug,
      publicado: data.publicado,
      fuente: "MANUAL",
      instagramId: null,
      instagramUrl: null,
      creadoEn: new Date(),
    });

    revalidatePath("/");
    revalidatePath("/proyectos");
    revalidatePath("/admin/publicaciones");

    const doc = await ref.get();
    return NextResponse.json(docToData<Publicacion>(doc), { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error al crear publicación" }, { status: 500 });
  }
}
