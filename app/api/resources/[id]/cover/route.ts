import { findVisiblePublication } from '@/lib/publications';
import { fetchWithRetry } from '@/lib/remote-file';

/**
 * Serves a Resources entry's cover image from this site's own origin.
 *
 * Used for covers hosted on Google Drive: Google blocks some of those images at
 * random when a browser loads them from another site, so cards showed the logo
 * placeholder instead. Fetched here, server to server, they load every time.
 *
 * Looked up by the entry's id, never a URL from the request. The page adds
 * `?v=<fingerprint of the cover link>`, so a changed cover gets a fresh URL and
 * the long browser cache below never shows an old one.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await findVisiblePublication(decodeURIComponent(id));
  const src = item?.coverImage?.trim();
  if (!src) return new Response('Not found', { status: 404 });

  try {
    const upstream = await fetchWithRetry(src, {
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 86400 },
    });
    const type = upstream.headers.get('content-type') ?? '';
    if (!upstream.ok || !type.startsWith('image/')) return new Response('Cover unavailable', { status: 502 });

    return new Response(await upstream.arrayBuffer(), {
      headers: {
        'Content-Type': type,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new Response('Cover unavailable', { status: 502 });
  }
}
