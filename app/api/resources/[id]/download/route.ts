import { findVisiblePublication } from '@/lib/publications';
import { fetchWithRetry, pdfFilename, toDirectFileUrl } from '@/lib/remote-file';

/**
 * Serves a Resources entry's PDF as a download, from this site's own origin —
 * browsers ignore `download` on links to other hosts and open the PDF in a tab
 * instead (same approach as /api/company-profile).
 *
 * The file is looked up by the entry's id, never taken from the request, so this
 * route can't be used to fetch arbitrary files.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await findVisiblePublication(decodeURIComponent(id));
  const raw = item?.fileUrl?.trim();
  if (!item || !raw) return new Response('Not found', { status: 404 });

  try {
    const upstream = await fetchWithRetry(toDirectFileUrl(raw), {
      signal: AbortSignal.timeout(30000),
      // PDFs are usually over the 2MB data-cache limit; stream them through.
      cache: 'no-store',
    });
    const type = upstream.headers.get('content-type') ?? '';

    // A share link that answers with a web page (e.g. Drive's "too large to scan"
    // notice) can't be saved from here; send the visitor to the original instead.
    if (!upstream.ok || !upstream.body || type.includes('text/html')) {
      return Response.redirect(raw, 302);
    }

    const filename = pdfFilename(item.title);
    // A generic file type rather than application/pdf: browsers hand a PDF type to
    // their viewer even when it's marked as an attachment, but always save this.
    const headers = new Headers({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
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
