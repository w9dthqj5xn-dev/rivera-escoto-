import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const doc = await db.collection("config").doc("instagram_credentials").get();
  if (!doc.exists) return NextResponse.json({});

  const data = doc.data();
  return NextResponse.json({ accessToken: data?.accessToken ?? null, userId: data?.userId ?? null });
}

export async function POST(req: Request) {
  if (!db) return NextResponse.json({ error: "DB not configured" }, { status: 500 });

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const { accessToken, userId } = body;
    if (!accessToken || !userId) return NextResponse.json({ error: "Faltan campos" }, { status: 400 });

    await db.collection("config").doc("instagram_credentials").set({ accessToken, userId, updatedAt: new Date() });

    return NextResponse.json({ message: "Credenciales guardadas" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error guardando credenciales" }, { status: 500 });
  }
}
