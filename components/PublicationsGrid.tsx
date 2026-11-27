'use client';

import { useState } from 'react';
import Img from './Img';
import Link from 'next/link';
import ShareButtons from './ShareButtons';
import { coverSrc, resourceItemPath, shareSentence } from '@/lib/resources';
import { NEWS_CATEGORY_LABELS, newsCategoryOf, type PublicationItem, type SharePlatformKey } from '@/types';

function formatDate(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PublicationsGrid({
  items,
  sharePlatforms = null,
}: {
  items: PublicationItem[];
  /** Platforms to offer when sharing is switched on in the dashboard; null hides sharing. */
  sharePlatforms?: SharePlatformKey[] | null;
}) {
  /** The card whose share buttons are showing, if any. */
  const [sharing, setSharing] = useState<string | null>(null);
  const canShare = Boolean(sharePlatforms && sharePlatforms.length > 0);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((pub, i) => {
          const date = formatDate(pub.date);
          return (
            <article key={pub.id} className={`card-aclpit reveal ${i % 3 === 1 ? 'reveal-delay-1' : i % 3 === 2 ? 'reveal-delay-2' : ''}`}>
              <Link
                href={resourceItemPath(pub.id)}
                className="placeholder-media pdf-cover"
                aria-label={`${pub.title} cover`}
                tabIndex={-1}
              >
                <Img src={coverSrc(pub)} alt="" />
              </Link>
              <div className="card-body">
                <div className="pub-meta">
                  <span>{pub.category || NEWS_CATEGORY_LABELS[newsCategoryOf(pub)]}</span>
                  {date && (
                    <>
                      <span className="dot" />
                      <span>{date}</span>
                    </>
                  )}
                </div>
                <h3>
                  <Link href={resourceItemPath(pub.id)} className="hover:text-wine">{pub.title}</Link>
                </h3>
                <p>{pub.description}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href={resourceItemPath(pub.id)} className="card-link">
                    Read More
                  </Link>
                  {canShare && (
                    <button
                      type="button"
                      className="card-link"
                      aria-expanded={sharing === pub.id}
                      onClick={() => setSharing(sharing === pub.id ? null : pub.id)}
                    >
                      <i className="bi bi-share me-1" aria-hidden="true" /> Share
                    </button>
                  )}
                </div>
                {canShare && sharing === pub.id && (
                  <ShareButtons
                    path={resourceItemPath(pub.id)}
                    title={pub.title}
                    sentence={shareSentence(pub)}
                    platforms={sharePlatforms ?? []}
                    className="mt-4"
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
