import { newsCategoryOf, type PublicationItem } from '@/types';

/** Each Resources entry's own page — the address its share buttons share. */
export const resourceItemPath = (id: string) => `/resources/item/${encodeURIComponent(id)}`;

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
