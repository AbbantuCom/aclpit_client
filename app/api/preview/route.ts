import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyPreviewToken } from '@/lib/preview-token';

/**
 * Preview entry point. The admin panel opens this in a new tab with a short-lived
 * signed token; it turns on Draft Mode and sends the editor to the page they were
 * editing, which then renders unpublished draft content.
 *
 * GET (rather than POST) because the admin opens it as a plain browser navigation.
 * The token is what protects it — without a valid one, nothing is enabled.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  const result = verifyPreviewToken(token);

  if (!result.valid) {
    const messages: Record<string, string> = {
      'missing-secret': 'Preview is not configured on this site (PREVIEW_SECRET is not set).',
      malformed: 'Invalid preview link.',
      'bad-signature': 'Invalid preview link.',
      expired: 'This preview link has expired — open a new one from the admin panel.',
    };
    return new Response(messages[result.reason], { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Redirect to the path carried inside the signed token, never to a raw query
  // param, so the link cannot be repointed at another origin.
  redirect(result.path);
}
