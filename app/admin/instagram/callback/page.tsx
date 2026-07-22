import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/firebase";
import { getInstagramRedirectUri } from "@/lib/instagram";

interface CallbackPageProps {
  searchParams: { code?: string; error?: string };
}

export const dynamic = "force-dynamic";

export default async function InstagramCallbackPage({ searchParams }: CallbackPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const { code, error } = searchParams;
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8">
          <h1 className="text-2xl font-bold text-red-700 mb-4">Error al conectar Instagram</h1>
          <p className="text-gray-600">Instagram devolvió un error durante el proceso de autorización.</p>
          <p className="mt-4 text-sm text-gray-500">Mensaje: {error}</p>
          <div className="mt-6">
            <a href="/admin/instagram" className="text-amber-600 font-semibold hover:underline">
              Volver al panel de Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Falta el código de Instagram</h1>
          <p className="text-gray-600">No se recibió el código de autorización de Instagram.</p>
          <div className="mt-6">
            <a href="/admin/instagram" className="text-amber-600 font-semibold hover:underline">
              Volver al panel de Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }

  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  const redirectUri = getInstagramRedirectUri();

  if (!appId || !appSecret) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-yellow-100 p-8">
          <h1 className="text-2xl font-bold text-yellow-700 mb-4">Falta configurar Instagram</h1>
          <p className="text-gray-600">Para conectar Instagram necesitas agregar estas variables en <code className="bg-gray-100 px-1 rounded">.env</code>:</p>
          <ul className="list-disc list-inside mt-3 text-gray-600">
            <li><code>INSTAGRAM_APP_ID</code></li>
            <li><code>INSTAGRAM_APP_SECRET</code></li>
            <li><code>INSTAGRAM_REDIRECT_URI</code> o <code>NEXTAUTH_URL</code></li>
          </ul>
          <div className="mt-6">
            <a href="/admin/instagram" className="text-amber-600 font-semibold hover:underline">
              Volver al panel de Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }

  try {
    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      throw new Error(`No se pudo intercambiar el código de Instagram: ${errorData}`);
    }

    const tokenData = await tokenResponse.json();
    const shortLivedToken = tokenData.access_token as string;
    const userId = (tokenData.user_id as string) ?? tokenData.user?.id;

    if (!shortLivedToken || !userId) {
      throw new Error("No se obtuvo token o user_id desde Instagram.");
    }

    const longTokenResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${shortLivedToken}`
    );

    if (!longTokenResponse.ok) {
      const errorData = await longTokenResponse.text();
      throw new Error(`No se pudo obtener el token de larga duración: ${errorData}`);
    }

    const longTokenData = await longTokenResponse.json();
    const accessToken = (longTokenData.access_token as string) || shortLivedToken;
    const storedUserId = userId;

    if (!db) {
      throw new Error("Base de datos no configurada.");
    }

    await db.collection("config").doc("instagram_credentials").set({
      accessToken,
      userId: storedUserId,
      updatedAt: new Date(),
    });

    redirect("/admin/instagram?connected=1");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-red-100 p-8">
          <h1 className="text-2xl font-bold text-red-700 mb-4">No se pudo conectar con Instagram</h1>
          <p className="text-gray-600">{message}</p>
          <div className="mt-6">
            <a href="/admin/instagram" className="text-amber-600 font-semibold hover:underline">
              Volver al panel de Instagram
            </a>
          </div>
        </div>
      </div>
    );
  }
}
