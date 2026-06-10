import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

// Endpoint de configuración inicial — ELIMINAR después de crear el admin
export async function POST(req: NextRequest) {
  const setupToken = process.env.SETUP_TOKEN;
  if (!setupToken) {
    return NextResponse.json({ error: "Endpoint deshabilitado" }, { status: 403 });
  }

  const { token, email, password, nombre } = await req.json();

  if (token !== setupToken) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }

  if (!email || !password || !nombre) {
    return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Buscar si ya existe
  const existing = await db
    .collection("adminUsers")
    .where("email", "==", email)
    .limit(1)
    .get();

  if (!existing.empty) {
    await existing.docs[0].ref.update({ password: hashedPassword, nombre });
  } else {
    await db.collection("adminUsers").add({
      email,
      password: hashedPassword,
      nombre,
      creadoEn: new Date(),
    });
  }

  return NextResponse.json({ ok: true, email });
}
