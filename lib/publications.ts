import { draftMode } from 'next/headers';
import { getSection } from '@/lib/content-api';
import { fallbackPublications, fallbackSettings } from '@/lib/fallback-content';
import type { PublicationItem } from '@/types';

/**
 * The Resources entry with this id, if visitors may see it: Resources switched
 * on (or an editor previewing) and the entry enabled. Server-only.
 */
export async function findVisiblePublication(id: string): Promise<PublicationItem | undefined> {
  const [settings, { isEnabled: isPreview }] = await Promise.all([
    getSection('settings', fallbackSettings),
    draftMode(),
  ]);
  if (!settings.publicationsEnabled && !isPreview) return undefined;
  const items = await getSection('publications', fallbackPublications);
  return items.find((p) => p.id === id && p.enabled !== false);
}
