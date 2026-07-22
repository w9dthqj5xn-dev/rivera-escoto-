/**
 * Script para sincronizar publicaciones de Instagram en la colección `publicaciones`.
 * Uso: npx tsx scripts/sync-instagram.ts
 */
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { obtenerPublicacionesInstagram } from "../lib/instagram";

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

async function main() {
  const posts = await obtenerPublicacionesInstagram();

  if (!posts || posts.length === 0) {
    console.log("No se encontraron publicaciones de Instagram o faltan credenciales.");
    await getFirestore().terminate();
    return;
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

  console.log(`Sincronizadas ${sincronizadas} publicaciones nuevas.`);
  await getFirestore().terminate();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
