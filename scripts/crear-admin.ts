/**
 * Script para crear el primer usuario administrador.
 * Uso: npx tsx scripts/crear-admin.ts email@ejemplo.com ContraseñaSegura123! "Nombre Completo"
 */
import bcrypt from "bcryptjs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

async function main() {
  const email = process.argv[2] || "admin@riveraescoto.com";
  const password = process.argv[3] || "Admin1234!";
  const nombre = process.argv[4] || "Administrador";

  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await db
    .collection("adminUsers")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!existing.empty) {
    await existing.docs[0].ref.update({ password: hashedPassword, nombre });
    console.log(`✓ Usuario admin actualizado: ${email}`);
  } else {
    await db.collection("adminUsers").add({
      email,
      password: hashedPassword,
      nombre,
      creadoEn: new Date(),
    });
    console.log(`✓ Usuario admin creado: ${email}`);
  }

  await getFirestore().terminate();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
