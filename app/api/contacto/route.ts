import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().optional(),
  mensaje: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await db.collection("contactos").add({
      ...data,
      telefono: data.telefono ?? null,
      leido: false,
      creadoEn: new Date(),
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 });
  }
}
