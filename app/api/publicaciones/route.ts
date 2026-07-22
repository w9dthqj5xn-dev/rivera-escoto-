import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db, docToData, docsToData } from "@/lib/firebase";
import { z } from "zod";

export const dynamic = "force-dynamic";
import type { Publicacion } from "@/lib/types";

const schema = z.object({
  titulo: z.string().min(1),
  contenido: z.string().optional(),
  imagen: z.string().optional().or(z.literal("")),
  slug: z.string().min(1),
  publicado: z.boolean().default(true),
});

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

    const ref = await db.collection("publicaciones").add({
      titulo: data.titulo,
      contenido: data.contenido ?? null,
      imagen: data.imagen || null,
      slug: data.slug,
      publicado: data.publicado,
      fuente: "MANUAL",
      instagramId: null,
      instagramUrl: null,
      creadoEn: new Date(),
    });

    const doc = await ref.get();
    return NextResponse.json(docToData<Publicacion>(doc), { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error al crear publicación" }, { status: 500 });
  }
}
