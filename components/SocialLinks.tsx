import { SOCIAL_PLATFORMS, type ContactSocials } from '@/types';

/**
 * Turns what an editor pasted into a safe outbound link: adds https:// when
 * the scheme was left off ("linkedin.com/company/x"), and drops anything that
 * isn't a web address (e.g. "javascript:").
 */
function toHref(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value || value === '#') return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value.replace(/^\/+/, '')}`;
  try {
    const url = new URL(withScheme);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

/**
 * The social media icons — only the platforms that have a link set in the
 * dashboard (Contact → Social Links), each opening in a new tab.
 */
export default function SocialLinks({ socials, className = '' }: { socials: ContactSocials | undefined; className?: string }) {
  const links = SOCIAL_PLATFORMS.flatMap((p) => {
    const href = toHref(socials?.[p.key]);
    return href ? [{ ...p, href }] : [];
  });
  if (links.length === 0) return null;

  return (
    <div className={`social-links ${className}`}>
      {links.map((l) => (
        <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} title={l.label}>
          <i className={`bi ${l.icon}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
