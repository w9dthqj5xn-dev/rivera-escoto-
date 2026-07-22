import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { z } from "zod";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

const schema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().optional(),
  mensaje: z.string().min(10),
});

const EMAIL_TO = process.env.EMAIL_TO || "Mrivera@riveraescoto.com";
const EMAIL_FROM = process.env.EMAIL_FROM || "no-reply@riveraescoto.com";

export async function POST(req: NextRequest) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const smtpConfigured = !!(smtpHost && smtpUser && smtpPass);

  try {
    const body = await req.json();
    const data = schema.parse(body);

    let emailSent = false;

    if (smtpConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: EMAIL_FROM,
          to: EMAIL_TO,
          replyTo: data.email,
          subject: `Nueva solicitud de cotización de ${data.nombre}`,
          text: `Nombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono ?? "No proporcionado"}\n\nMensaje:\n${data.mensaje}`,
          html: `
            <h2>Solicitud de cotización</h2>
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Teléfono:</strong> ${data.telefono ?? "No proporcionado"}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${data.mensaje.replace(/\n/g, "<br />")}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (e) {
        console.error("Error enviando email de contacto:", e);
      }
    }

    if (db) {
      await db.collection("contactos").add({
        ...data,
        telefono: data.telefono ?? null,
        leido: false,
        creadoEn: new Date(),
        emailSent: emailSent,
      });
    }

    if (!smtpConfigured) {
      return NextResponse.json(
        { ok: true, warning: "Correo no configurado. Mensaje guardado en el administrador." },
        { status: 201 }
      );
    }

    if (!emailSent) {
      return NextResponse.json({ ok: true, warning: "No se pudo enviar el correo, pero el mensaje se guardó." }, { status: 201 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ error: e.issues }, { status: 400 });
    }
    console.error("Error al enviar cotización:", e);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }
}
