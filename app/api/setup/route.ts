import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

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

  const usuario = await prisma.adminUser.upsert({
    where: { email },
    update: { password: hashedPassword, nombre },
    create: { email, password: hashedPassword, nombre },
  });

  return NextResponse.json({ ok: true, email: usuario.email });
}
