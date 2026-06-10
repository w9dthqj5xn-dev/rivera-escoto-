import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";
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

      const existing = await db
        .collection("publicaciones")
        .where("instagramId", "==", post.id)
        .limit(1)
        .get();

      if (existing.empty) {
        await db.collection("publicaciones").add({
          titulo: post.caption?.split("\n")[0]?.substring(0, 100) || "Publicación de Instagram",
          contenido: post.caption || null,
          imagen: post.media_url,
          slug: `instagram-${post.id}`,
          fuente: "INSTAGRAM",
          instagramId: post.id,
          instagramUrl: post.permalink,
          publicado: true,
          creadoEn: new Date(),
        });
        sincronizadas++;
      }
    }

    return NextResponse.json({ message: `Se sincronizaron ${sincronizadas} publicaciones nuevas`, sincronizadas });
  } catch {
    return NextResponse.json({ error: "Error al sincronizar Instagram" }, { status: 500 });
  }
}
