import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { obtenerPublicacionesInstagram } from "@/lib/instagram";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const posts = await obtenerPublicacionesInstagram();

    if (posts.length === 0) {
      return NextResponse.json({ message: "No se encontraron publicaciones de Instagram", sincronizadas: 0 });
    }

    let sincronizadas = 0;

    for (const post of posts) {
      if (post.media_type === "VIDEO") continue;

      const existente = await prisma.publicacion.findUnique({
        where: { instagramId: post.id },
      });

      if (!existente) {
        await prisma.publicacion.create({
          data: {
            titulo: post.caption?.split("\n")[0]?.substring(0, 100) || "Publicación de Instagram",
            contenido: post.caption || null,
            imagen: post.media_url,
            slug: `instagram-${post.id}`,
            fuente: "INSTAGRAM",
            instagramId: post.id,
            instagramUrl: post.permalink,
            publicado: true,
          },
        });
        sincronizadas++;
      }
    }

    return NextResponse.json({ message: `Se sincronizaron ${sincronizadas} publicaciones nuevas`, sincronizadas });
  } catch {
    return NextResponse.json({ error: "Error al sincronizar Instagram" }, { status: 500 });
  }
}
