import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * Leaves preview mode and returns to the published site.
 *
 * POST, because it changes state for subsequent requests. The banner submits a
 * form here rather than linking, so Next's <Link> prefetching can't clear the
 * draft cookie behind the editor's back.
 */
export async function POST() {
  const draft = await draftMode();
  draft.disable();
  redirect('/');
}
