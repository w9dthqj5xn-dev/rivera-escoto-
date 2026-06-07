import { requireAdmin } from "@/lib/session";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminInstagramSync from "@/components/admin/AdminInstagramSync";

export default async function InstagramAdminPage() {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Sincronizar Instagram</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <p className="text-gray-500 text-sm mb-6">
            Al sincronizar, se importarán las publicaciones más recientes de Instagram que no estén ya en el sitio.
            Asegúrate de haber configurado las variables <code className="bg-gray-100 px-1 rounded">INSTAGRAM_ACCESS_TOKEN</code> e <code className="bg-gray-100 px-1 rounded">INSTAGRAM_USER_ID</code> en el archivo <code className="bg-gray-100 px-1 rounded">.env</code>.
          </p>
          <AdminInstagramSync />
        </div>
      </div>
    </div>
  );
}
