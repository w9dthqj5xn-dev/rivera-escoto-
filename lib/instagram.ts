export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
}

export function getInstagramRedirectUri(): string {
  return process.env.INSTAGRAM_REDIRECT_URI || `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/instagram/callback`;
}

export function getInstagramAuthUrl(): string | null {
  const appId = process.env.INSTAGRAM_APP_ID;
  if (!appId) return null;

  const redirectUri = getInstagramRedirectUri();
  const scope = process.env.INSTAGRAM_SCOPE || "user_profile,user_media";
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri,
    scope,
    response_type: "code",
  });

  return `https://api.instagram.com/oauth/authorize?${params.toString()}`;
}

export async function obtenerPublicacionesInstagram(): Promise<InstagramMedia[]> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}
