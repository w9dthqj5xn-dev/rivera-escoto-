import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db, docToData } from "@/lib/firebase";
import type { Publicacion } from "@/lib/types";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  try {
    await db.collection("publicaciones").doc(id).delete();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { id } = await params;

  try {
    const body = await req.json();
    const ref = db.collection("publicaciones").doc(id);
    await ref.update(body);
    const doc = await ref.get();
    return NextResponse.json(docToData<Publicacion>(doc));
  } catch {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}
