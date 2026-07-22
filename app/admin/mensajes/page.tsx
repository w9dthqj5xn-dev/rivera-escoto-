import { requireAdmin } from "@/lib/session";
import { db, docsToData } from "@/lib/firebase";
import type { Contacto } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import AdminMensajeItem from "@/components/admin/AdminMensajeItem";

export default async function MensajesAdminPage() {
  await requireAdmin();

  let mensajes: Contacto[] = [];

  try {
    const snap = await db
      .collection("contactos")
      .orderBy("creadoEn", "desc")
      .get();
    mensajes = docsToData<Contacto>(snap);
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
              <AdminMensajeItem key={m.id} mensaje={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
