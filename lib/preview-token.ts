import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Verifies the preview tokens minted by aclpit_admin_api's lib/preview.ts.
 *
 * Both sides sign with the shared PREVIEW_SECRET (same arrangement as
 * REVALIDATE_SECRET). The token carries the path it was issued for, so the
 * redirect target is signed rather than attacker-supplied, and an expiry, so a
 * link copied out of an editor's browser history stops working.
 */

interface TokenPayload {
  path: string;
  exp: number;
}

export type PreviewTokenResult =
  | { valid: true; path: string }
  | { valid: false; reason: 'missing-secret' | 'malformed' | 'bad-signature' | 'expired' };

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function verifyPreviewToken(token: string | null): PreviewTokenResult {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return { valid: false, reason: 'missing-secret' };
  if (!token) return { valid: false, reason: 'malformed' };

  const [payloadPart, signature] = token.split('.');
  if (!payloadPart || !signature) return { valid: false, reason: 'malformed' };

  const expected = createHmac('sha256', secret).update(payloadPart).digest('base64url');
  if (!safeEqual(expected, signature)) return { valid: false, reason: 'bad-signature' };

  let payload: TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(payloadPart, 'base64url').toString('utf8'));
  } catch {
    return { valid: false, reason: 'malformed' };
  }

  if (typeof payload.path !== 'string' || typeof payload.exp !== 'number') {
    return { valid: false, reason: 'malformed' };
  }
  if (Date.now() > payload.exp) return { valid: false, reason: 'expired' };

  // Signed or not, only ever redirect somewhere on this site. `//host` and
  // backslash forms are the usual ways a path sneaks off-origin.
  if (!payload.path.startsWith('/') || payload.path.startsWith('//') || payload.path.includes('\\')) {
    return { valid: false, reason: 'malformed' };
  }

  return { valid: true, path: payload.path };
}
