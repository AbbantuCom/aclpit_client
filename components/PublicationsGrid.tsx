'use client';

import { useState } from 'react';
import Img from './Img';
import PdfModal from './PdfModal';

export interface PublicationEntry {
  id: string;
  driveId: string;
  category: string;
  title: string;
  description: string;
}

export default function PublicationsGrid({ items }: { items: PublicationEntry[] }) {
  const [active, setActive] = useState<PublicationEntry | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((pub, i) => (
          <article key={pub.id} className={`card-aclpit reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : ''}`}>
            <div className="placeholder-media pdf-cover" role="img" aria-label={`${pub.title} cover`}>
              <Img src={`https://drive.google.com/thumbnail?id=${pub.driveId}&sz=w800`} alt="" />
            </div>
            <div className="card-body">
              <div className="pub-meta"><span>{pub.category}</span></div>
              <h3>{pub.title}</h3>
              <p>{pub.description}</p>
              <button type="button" className="card-link" onClick={() => setActive(pub)}>
                View Publication
              </button>
            </div>
          </article>
        ))}
      </div>

      {active && (
        <PdfModal
          title={active.title}
          previewUrl={`https://drive.google.com/file/d/${active.driveId}/preview`}
          downloadUrl={`https://drive.google.com/uc?export=download&id=${active.driveId}`}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
