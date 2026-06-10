import { requireAdmin } from "@/lib/session";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Plus, RefreshCw, MessageSquare, FileText, Zap } from "lucide-react";
import AdminSignOutButton from "@/components/admin/AdminSignOutButton";

export default async function AdminPage() {
  await requireAdmin();

  let stats = { publicaciones: 0, contactos: 0, instagramPubs: 0 };

  try {
    const [pubSnap, contactSnap, igSnap] = await Promise.all([
      db.collection("publicaciones").where("publicado", "==", true).count().get(),
      db.collection("contactos").where("leido", "==", false).count().get(),
      db.collection("publicaciones").where("fuente", "==", "INSTAGRAM").count().get(),
    ]);
    stats = {
      publicaciones: pubSnap.data().count,
      contactos: contactSnap.data().count,
      instagramPubs: igSnap.data().count,
    };
  } catch {
    // DB no configurada aún
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Topbar */}
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold">
          <Zap className="text-amber-400" size={22} />
          <span>Admin Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            Ver sitio →
          </Link>
          <AdminSignOutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: FileText, label: "Publicaciones activas", value: stats.publicaciones, color: "text-amber-500", bg: "bg-amber-50" },
            { icon: MessageSquare, label: "Mensajes sin leer", value: stats.contactos, color: "text-blue-500", bg: "bg-blue-50" },
            { icon: RefreshCw, label: "Posts de Instagram", value: stats.instagramPubs, color: "text-pink-500", bg: "bg-pink-50" },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center shrink-0`}>
                <Icon className={color} size={22} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/admin/publicaciones"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-amber-200 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="text-amber-500" size={22} />
              <h2 className="font-bold text-gray-900 text-lg">Publicaciones</h2>
            </div>
            <p className="text-gray-500 text-sm">Crear, editar y eliminar publicaciones del sitio web.</p>
          </Link>

          <Link
            href="/admin/publicaciones/nueva"
            className="bg-amber-400 rounded-xl shadow-sm p-6 hover:bg-amber-500 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <Plus className="text-gray-900" size={22} />
              <h2 className="font-bold text-gray-900 text-lg">Nueva Publicación</h2>
            </div>
            <p className="text-gray-800 text-sm">Crea una nueva publicación manual para el sitio.</p>
          </Link>

          <Link
            href="/admin/instagram"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-pink-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="text-pink-500" size={22} />
              <h2 className="font-bold text-gray-900 text-lg">Sincronizar Instagram</h2>
            </div>
            <p className="text-gray-500 text-sm">Importa las publicaciones más recientes desde Instagram.</p>
          </Link>

          <Link
            href="/admin/mensajes"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-blue-200 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="text-blue-500" size={22} />
              <h2 className="font-bold text-gray-900 text-lg">Mensajes de contacto</h2>
            </div>
            <p className="text-gray-500 text-sm">Ver los mensajes enviados desde el formulario de contacto.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
