import { requireAdmin } from "@/lib/session";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminInstagramSync from "@/components/admin/AdminInstagramSync";
import { getInstagramAuthUrl, getInstagramRedirectUri } from "@/lib/instagram";

export default async function InstagramAdminPage() {
  await requireAdmin();

  const redirectUri = getInstagramRedirectUri();
  const canUseOAuth = Boolean(process.env.INSTAGRAM_APP_ID && process.env.INSTAGRAM_APP_SECRET);
  const authUrl = canUseOAuth ? getInstagramAuthUrl() : null;

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
          {!authUrl && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 mb-6 text-sm text-red-700">
              <p className="font-semibold">No se puede mostrar el botón de Instagram.</p>
              <p>Faltan las siguientes variables en <code className="bg-gray-100 px-1 rounded">.env</code>:</p>
              <ul className="list-disc list-inside mt-2 text-red-700">
                <li><code>INSTAGRAM_APP_ID</code></li>
                <li><code>INSTAGRAM_APP_SECRET</code></li>
              </ul>
              <p className="mt-2">Agrega esos valores y reinicia el servidor para ver el botón.</p>
            </div>
          )}

          <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 mb-6 text-sm text-amber-800">
            <p className="font-semibold">URL de retorno usada para Instagram</p>
            <p className="mt-1 break-all">{redirectUri}</p>
            <p className="mt-2">Configura esta misma URL en tu app de Meta Developers para que el flujo de OAuth funcione.</p>
          </div>

          <p className="text-gray-500 text-sm mb-4">
            Desde aquí puedes enlazar Instagram con el administrador. Guarda el token y el user ID para poder sincronizar publicaciones desde tu cuenta.
          </p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
            <p className="text-amber-700 text-sm font-semibold">Instrucciones:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm space-y-1 mt-2">
              <li>Obtén un Access Token de Instagram Basic Display API.</li>
              <li>Usa el ID de usuario de Instagram conectado.</li>
              <li>Guarda las credenciales y luego haz clic en "Sincronizar ahora".</li>
            </ul>
          </div>
          <AdminInstagramSync authUrl={authUrl ?? undefined} />
        </div>
      </div>
    </div>
  );
}
