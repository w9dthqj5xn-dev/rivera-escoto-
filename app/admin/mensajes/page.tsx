import { requireAdmin } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

export default async function MensajesAdminPage() {
  await requireAdmin();

  let mensajes: Awaited<ReturnType<typeof prisma.contacto.findMany>> = [];

  try {
    mensajes = await prisma.contacto.findMany({
      orderBy: { creadoEn: "desc" },
    });
  } catch {
    // DB no configurada
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Mensajes de contacto</h1>
        </div>

        {mensajes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
            <Mail className="mx-auto mb-3 text-gray-300" size={40} />
            <p>No hay mensajes aún.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {mensajes.map((m) => (
              <div
                key={m.id}
                className={`bg-white rounded-xl shadow-sm border p-6 ${!m.leido ? "border-amber-200 bg-amber-50/20" : "border-gray-100"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{m.nombre}</p>
                    <p className="text-sm text-gray-500">{m.email}{m.telefono ? ` · ${m.telefono}` : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{new Date(m.creadoEn).toLocaleDateString("es-NI")}</p>
                    {!m.leido && (
                      <span className="inline-block mt-1 text-xs bg-amber-400 text-gray-900 font-semibold px-2 py-0.5 rounded-full">Nuevo</span>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{m.mensaje}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
