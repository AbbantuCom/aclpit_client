'use client';

import { useState, type ReactNode } from 'react';

interface Props {
  /** Same-origin URL that returns the file. */
  href: string;
  /** Name the file is saved under. */
  filename: string;
  className?: string;
  children: ReactNode;
}

/**
 * A link that saves the file to the device instead of opening it in a tab.
 *
 * On click it fetches the file and saves it from an in-memory blob URL — a
 * browser always honours `download` on a blob it created, so the file lands in
 * the downloads folder with no viewer or new tab. Without JavaScript (or if the
 * fetch fails) the plain link still works: the route answers with
 * `Content-Disposition: attachment`, which also triggers a download.
 */
export default function DirectDownloadLink({ href, filename, className, children }: Props) {
  const [busy, setBusy] = useState(false);

  async function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (new tab, etc.) behave as the visitor asked.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(href);
      const type = res.headers.get('content-type') ?? '';
      if (!res.ok || type.includes('text/html')) throw new Error(`Download failed (${res.status})`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      // Revoke later: some browsers read the blob after click() returns.
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
    } catch {
      // Fall back to the plain link; the route still sends it as an attachment.
      window.location.assign(href);
    } finally {
      setBusy(false);
    }
  }

  return (
    <a href={href} download={filename} className={className} onClick={onClick} aria-busy={busy}>
      {children}
    </a>
  );
}
