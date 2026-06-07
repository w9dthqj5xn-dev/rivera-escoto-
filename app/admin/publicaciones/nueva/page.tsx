import { requireAdmin } from "@/lib/session";
import PublicacionForm from "@/components/admin/PublicacionForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NuevaPublicacionPage() {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/publicaciones" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Nueva Publicación</h1>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <PublicacionForm />
        </div>
      </div>
    </div>
  );
}
