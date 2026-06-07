import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  titulo: z.string().min(1),
  contenido: z.string().optional(),
  imagen: z.string().url().optional().or(z.literal("")),
  slug: z.string().min(1),
  publicado: z.boolean().default(true),
});

export async function GET() {
  try {
    const publicaciones = await prisma.publicacion.findMany({
      where: { publicado: true },
      orderBy: { creadoEn: "desc" },
    });
    return NextResponse.json(publicaciones);
  } catch {
    return NextResponse.json({ error: "Error al obtener publicaciones" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const body = await req.json();
    const data = schema.parse(body);

    const publicacion = await prisma.publicacion.create({
      data: {
        titulo: data.titulo,
        contenido: data.contenido,
        imagen: data.imagen || null,
        slug: data.slug,
        publicado: data.publicado,
        fuente: "MANUAL",
      },
    });
    return NextResponse.json(publicacion, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error al crear publicación" }, { status: 500 });
  }
}
