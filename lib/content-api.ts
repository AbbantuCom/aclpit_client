import { draftMode } from 'next/headers';
import type { ContentSection } from '@/types';

interface ContentResponse<T> {
  data: T | null;
}

/**
 * Fetches a content section from the admin API.
 *
 * Normally this reads the *published* copy, tagged for on-demand revalidation via
 * app/api/revalidate and time-based revalidation every hour.
 *
 * In Draft Mode (an editor arrived through /api/preview) it reads the *draft* copy
 * instead, authenticating with the shared preview secret — that endpoint is not
 * public. Draft reads are never cached, so each refresh shows the latest save.
 *
 * Never throws: any failure (missing ADMIN_API_URL, network error, non-200,
 * bad JSON, or an unseeded section) logs a warning and resolves to `fallback`
 * instead, so pages always render — even if the admin API is unreachable at
 * build or revalidate time.
 */
export async function getSection<T>(section: ContentSection, fallback: T): Promise<T> {
  const baseUrl = process.env.ADMIN_API_URL;
  if (!baseUrl) {
    console.warn(`ADMIN_API_URL is not set — rendering "${section}" with fallback content.`);
    return fallback;
  }

  const { isEnabled: isPreview } = await draftMode();
  const previewSecret = process.env.PREVIEW_SECRET;

  if (isPreview && !previewSecret) {
    console.warn(`PREVIEW_SECRET is not set — "${section}" preview falls back to published content.`);
  }

  const useDraft = isPreview && Boolean(previewSecret);
  const url = `${baseUrl.replace(/\/$/, '')}/api/content/${section}${useDraft ? '?state=draft' : ''}`;

  try {
    const res = await fetch(url, {
      ...(useDraft
        ? { cache: 'no-store' as const, headers: { 'x-preview-secret': previewSecret as string } }
        : { next: { tags: [section], revalidate: 3600 } }),
    });

    if (!res.ok) {
      console.warn(`Content API returned ${res.status} for "${section}" — using fallback content.`);
      return fallback;
    }

    const json = (await res.json()) as ContentResponse<T>;
    return json.data ?? fallback;
  } catch (err) {
    console.warn(`Failed to fetch "${section}" from the content API — using fallback content.`, err);
    return fallback;
  }
}
