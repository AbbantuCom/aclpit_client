import { getSection } from '@/lib/content-api';
import { fallbackAbout } from '@/lib/fallback-content';

const FILENAME = 'ACLPIT-Company-Profile.pdf';

/**
 * Serves the company profile PDF as a download.
 *
 * The PDF lives on another host (media storage, Drive, ...), and browsers ignore
 * the `download` attribute on cross-origin links — they just open the file in a
 * tab. Fetching it here and returning it from this site's own origin with
 * `Content-Disposition: attachment` makes a click save it straight to the device.
 *
 * The URL is read from the About content, never from the request, so this route
 * can't be used to proxy arbitrary files.
 */
export async function GET() {
  const about = await getSection('about', fallbackAbout);
  const raw = about.companyProfileUrl?.trim();
  if (!raw) return new Response('No company profile has been uploaded.', { status: 404 });

  const source = toDirectFileUrl(raw);

  try {
    const upstream = await fetch(source, {
      signal: AbortSignal.timeout(20000),
      // PDFs are usually over the 2MB data-cache limit; stream them through.
      cache: 'no-store',
    });
    const type = upstream.headers.get('content-type') ?? '';

    // A share link that returns a web page instead of the file (e.g. a Drive
    // "can't scan for viruses" notice) can't be downloaded from here — send the
    // visitor to the original link rather than saving an HTML page as a PDF.
    if (!upstream.ok || !upstream.body || type.includes('text/html')) {
      return Response.redirect(raw, 302);
    }

    // Sent as a generic file rather than application/pdf: browsers (and phone
    // browsers especially) hand a PDF type to their viewer even when it's marked
    // as an attachment, but always save a generic file. nosniff stops them
    // guessing it's a PDF anyway.
    const headers = new Headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${FILENAME}"; filename*=UTF-8''${encodeURIComponent(FILENAME)}`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=300',
    });
    const length = upstream.headers.get('content-length');
    if (length) headers.set('Content-Length', length);

    return new Response(upstream.body, { status: 200, headers });
  } catch {
    return Response.redirect(raw, 302);
  }
}

/** Turns Google Drive / Dropbox share links into links that return the file itself. */
function toDirectFileUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  if (url.hostname === 'drive.google.com') {
    const id = url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? url.searchParams.get('id');
    if (id) return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
  }
  if (url.hostname.endsWith('dropbox.com')) {
    url.searchParams.delete('dl');
    url.searchParams.set('dl', '1');
    return url.toString();
  }
  return url.toString();
}
