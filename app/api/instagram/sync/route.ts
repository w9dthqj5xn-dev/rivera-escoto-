import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { obtenerPublicacionesInstagram } from "@/lib/instagram";

export const dynamic = "force-dynamic";

export async function POST() {
  if (!db) return NextResponse.json({ error: "Base de datos no configurada" }, { status: 500 });

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    // Intentar usar variables de entorno
    let accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    let userId = process.env.INSTAGRAM_USER_ID;

    // Si faltan, buscar credenciales en Firestore
    if (!accessToken || !userId) {
      const doc = await db.collection("config").doc("instagram_credentials").get();
      if (doc.exists) {
        const data = doc.data();
        accessToken = data?.accessToken ?? accessToken;
        userId = data?.userId ?? userId;
      }
    }

    if (!accessToken || !userId) {
      return NextResponse.json({ error: "Credenciales de Instagram no configuradas" }, { status: 400 });
    }

    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
    );

    if (!res.ok) return NextResponse.json({ message: "No se encontraron publicaciones de Instagram", sincronizadas: 0 });

    const data = await res.json();
    const posts = data.data ?? [];

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
          videoUrl: null,
          youtubeUrl: null,
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
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al sincronizar Instagram" }, { status: 500 });
  }
}
