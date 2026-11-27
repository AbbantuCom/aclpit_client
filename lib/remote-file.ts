/**
 * Helpers for files the dashboard links to on other hosts (Google Drive,
 * Dropbox, the media bucket). Safe to import from client components.
 */

function parse(raw: string): URL | null {
  try {
    return new URL(raw.trim());
  } catch {
    return null;
  }
}

function driveFileId(url: URL): string | null {
  if (url.hostname !== 'drive.google.com') return null;
  return url.pathname.match(/\/file\/d\/([^/]+)/)?.[1] ?? url.searchParams.get('id');
}

/** Turns Google Drive / Dropbox share links into links that return the file itself. */
export function toDirectFileUrl(raw: string): string {
  const url = parse(raw);
  if (!url) return raw;
  const id = driveFileId(url);
  if (id) return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;
  if (url.hostname.endsWith('dropbox.com')) {
    url.searchParams.delete('dl');
    url.searchParams.set('dl', '1');
    return url.toString();
  }
  return url.toString();
}

/**
 * A link that can be shown inside the site's PDF viewer (an iframe). Drive's
 * own "view" page refuses to be framed; its "preview" page is made for it.
 */
export function toEmbeddablePdfUrl(raw: string): string {
  const url = parse(raw);
  if (!url) return raw;
  const id = driveFileId(url);
  return id ? `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview` : raw;
}

/**
 * Google serves Drive images unreliably when a browser loads them straight from
 * another site (some are blocked at random), so the site serves those itself.
 */
export function isGoogleHosted(raw: string): boolean {
  const url = parse(raw);
  return Boolean(url && (url.hostname === 'drive.google.com' || url.hostname.endsWith('.googleusercontent.com')));
}

/** "Borderless Identity: A Brief" → "Borderless-Identity-A-Brief.pdf" */
export function pdfFilename(title: string): string {
  const base = title
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
  return `${base || 'document'}.pdf`;
}

/** Short, stable fingerprint of a string — used to bust caches when a file's link changes. */
export function fingerprint(value: string): string {
  let h = 5381;
  for (let i = 0; i < value.length; i++) h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

/**
 * fetch(), tried once more if the connection itself fails (not on an HTTP
 * error). Connections to Google from a busy or patchy network sometimes drop
 * before any answer; a second attempt nearly always gets through.
 */
export async function fetchWithRetry(url: string, init: RequestInit, attempts = 2): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      if (i >= attempts || init.signal?.aborted) throw err;
      await new Promise((r) => setTimeout(r, 400));
    }
  }
}
