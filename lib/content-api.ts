import { draftMode } from 'next/headers';
import type { ContentSection } from '@/types';

interface ContentResponse<T> {
  data: T | null;
}

/**
 * How long a single content read may take before we give up and use the fallback.
 *
 * Without this, a slow (not merely broken) admin API stalls a page past Next's
 * 60-second per-page export limit and fails the whole build — the fallback only
 * helps if we reach it in time. A healthy API answers in well under a second.
 */
const FETCH_TIMEOUT_MS = 8000;

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
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
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
    // Log the reason only — a DOMException (e.g. the timeout above) prints its
    // entire constant table when passed as an object, drowning the build log.
    const reason =
      err instanceof Error
        ? err.name === 'TimeoutError'
          ? `no response within ${FETCH_TIMEOUT_MS}ms`
          : `${err.name}: ${err.message}`
        : String(err);
    console.warn(`Failed to fetch "${section}" from the content API (${reason}) — using fallback content.`);
    return fallback;
  }
}
