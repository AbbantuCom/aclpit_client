'use client';

import { useState } from 'react';
import Img from './Img';
import PdfModal from './PdfModal';
import type { PublicationItem } from '@/types';

function formatDate(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PublicationsGrid({ items }: { items: PublicationItem[] }) {
  const [active, setActive] = useState<PublicationItem | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((pub, i) => {
          const date = formatDate(pub.date);
          return (
            <article key={pub.id} className={`card-aclpit reveal ${i % 3 === 1 ? 'reveal-delay-1' : i % 3 === 2 ? 'reveal-delay-2' : ''}`}>
              <div className="placeholder-media pdf-cover" role="img" aria-label={`${pub.title} cover`}>
                <Img src={pub.coverImage} alt="" />
              </div>
              <div className="card-body">
                <div className="pub-meta">
                  <span>{pub.category}</span>
                  {date && (
                    <>
                      <span className="dot" />
                      <span>{date}</span>
                    </>
                  )}
                </div>
                <h3>{pub.title}</h3>
                <p>{pub.description}</p>
                {pub.fileUrl && (
                  <button type="button" className="card-link" onClick={() => setActive(pub)}>
                    View Publication
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {active && (
        <PdfModal
          title={active.title}
          previewUrl={active.fileUrl}
          downloadUrl={active.fileUrl}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
