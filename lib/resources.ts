import { newsCategoryOf, type PublicationItem } from '@/types';
import { fingerprint, isGoogleHosted, pdfFilename } from '@/lib/remote-file';

/** Each Resources entry's own page — the address its share buttons share. */
export const resourceItemPath = (id: string) => `/resources/item/${encodeURIComponent(id)}`;

/** Saves the entry's PDF straight to the device (see app/api/resources/[id]/download). */
export const resourceDownloadPath = (id: string) => `/api/resources/${encodeURIComponent(id)}/download`;

/** The name the downloaded PDF is saved under. */
export const resourceDownloadName = (item: Pick<PublicationItem, 'title'>) => pdfFilename(item.title);

/**
 * Where the cover image is loaded from. Google Drive covers go through this
 * site (app/api/resources/[id]/cover) because Google blocks some of them at
 * random when loaded directly; everything else is used as is.
 */
export function coverSrc(item: Pick<PublicationItem, 'id' | 'coverImage'>): string {
  const cover = item.coverImage?.trim() ?? '';
  if (!cover || !isGoogleHosted(cover)) return cover;
  return `/api/resources/${encodeURIComponent(item.id)}/cover?v=${fingerprint(cover)}`;
}

/**
 * The site's public address, e.g. "https://aclpit.org" (NEXT_PUBLIC_SITE_URL).
 * Share links and link previews use it so they always point at the live site;
 * empty when unset, in which case shares use the address the visitor is on.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim().replace(/\/+$/, '');

const CENTRE = 'the African Centre for Law and Public Interest Technology (ACLPIT)';

/** The one-line introduction posted above the link when an entry is shared. */
export function shareSentence(item: Pick<PublicationItem, 'title' | 'newsCategory'>): string {
  const t = `“${item.title.trim()}”`;
  switch (newsCategoryOf(item)) {
    case 'research':
      return `Read ${t}, new research from ${CENTRE}.`;
    case 'annual-reports':
      return `Read ${t}, the annual report of ${CENTRE}.`;
    case 'stories':
      return `Read ${t}, a story from ${CENTRE}.`;
    case 'events':
      return `Find out about ${t}, an event from ${CENTRE}.`;
    case 'newsletter':
      return `Read ${t}, the latest newsletter from ${CENTRE}.`;
    case 'news':
    default:
      return `Read ${t}, the latest from ${CENTRE}.`;
  }
}
