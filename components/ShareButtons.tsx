'use client';

import { useState } from 'react';
import { SHARE_PLATFORMS, type SharePlatformKey } from '@/types';
import { SITE_URL } from '@/lib/resources';

/**
 * The share address for each platform. Where the platform takes free text, the
 * post is the sentence, a blank line, then the link alone on its own line —
 * apps only make a link tappable (and fetch its preview card) when it stands
 * apart from the words around it. Facebook and LinkedIn take only the link and
 * build the post from the page's preview details.
 */
function shareTarget(platform: SharePlatformKey, url: string, title: string, sentence: string): string | null {
  const u = encodeURIComponent(url);
  const post = encodeURIComponent(`${sentence}\n\n${url}`);
  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case 'x':
      return `https://x.com/intent/post?text=${post}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case 'whatsapp':
      return `https://wa.me/?text=${post}`;
    case 'telegram':
      // Telegram always puts the link on its own line above the text.
      return `https://t.me/share/url?url=${u}&text=${encodeURIComponent(sentence)}`;
    case 'reddit':
      return `https://www.reddit.com/submit?url=${u}&title=${encodeURIComponent(title)}`;
    case 'threads':
      return `https://www.threads.net/intent/post?text=${post}`;
    case 'bluesky':
      return `https://bsky.app/intent/compose?text=${post}`;
    case 'email':
      return `mailto:?subject=${encodeURIComponent(title)}&body=${post}`;
    case 'copy':
      return null;
  }
}

interface Props {
  /** Site path of the page being shared, e.g. "/resources/item/pub-123". */
  path: string;
  title: string;
  /** The introduction posted above the link (see shareSentence). */
  sentence: string;
  platforms: SharePlatformKey[];
  className?: string;
}

/**
 * Share buttons for one page. "Copy link" copies just the link; the others
 * post a short sentence with the link on its own line beneath it.
 */
export default function ShareButtons({ path, title, sentence, platforms, className = '' }: Props) {
  const [copied, setCopied] = useState(false);
  const shown = SHARE_PLATFORMS.filter((p) => platforms.includes(p.key));
  if (shown.length === 0) return null;

  async function share(platform: SharePlatformKey) {
    // The live site's address when configured, so a share made from a preview
    // or test deployment still points visitors at the real site.
    const url = new URL(path, SITE_URL || window.location.origin).href;
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Clipboard blocked (e.g. insecure context): let the visitor copy it by hand.
        window.prompt('Copy this link:', url);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }
    const target = shareTarget(platform, url, title, sentence);
    if (!target) return;
    if (platform === 'email') {
      window.location.href = target;
    } else {
      window.open(target, '_blank', 'noopener,noreferrer,width=640,height=640');
    }
  }

  return (
    <div className={`share-buttons ${className}`}>
      {shown.map((p) => {
        const label = p.key === 'copy' ? (copied ? 'Link copied' : 'Copy link') : `Share on ${p.label}`;
        return (
          <button key={p.key} type="button" onClick={() => share(p.key)} aria-label={label} title={label}>
            <i className={`bi ${p.key === 'copy' && copied ? 'bi-check2' : p.icon}`} aria-hidden="true" />
          </button>
        );
      })}
      <span className="sr-only" aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</span>
    </div>
  );
}
