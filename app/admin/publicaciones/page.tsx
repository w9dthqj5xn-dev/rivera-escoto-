import { requireAdmin } from "@/lib/session";
import { db, docsToData } from "@/lib/firebase";
import type { Publicacion } from "@/lib/types";
import Link from "next/link";
import AdminPublicacionesTable from "@/components/admin/AdminPublicacionesTable";
import { Plus, ArrowLeft } from "lucide-react";

export default async function AdminPublicacionesPage() {
  await requireAdmin();

  let publicaciones: Publicacion[] = [];

  try {
    const snap = await db
      .collection("publicaciones")
      .orderBy("creadoEn", "desc")
      .get();
    publicaciones = docsToData<Publicacion>(snap);
  } catch {
    // DB no configurada aún
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Publicaciones</h1>
          </div>
          <Link
            href="/admin/publicaciones/nueva"
            className="flex items-center gap-2 bg-amber-400 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors text-sm"
          >
            <Plus size={16} /> Nueva publicación
          </Link>
        </div>

        <AdminPublicacionesTable publicaciones={publicaciones} />
      </div>
    </div>
  );
}
