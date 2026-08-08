'use client';

import { useState } from 'react';
import Img from './Img';
import VideoModal from './VideoModal';
import { extractYouTubeId } from '@/lib/youtube';
import type { DialogueItem } from '@/types';

export default function DialoguesGrid({ items }: { items: DialogueItem[] }) {
  const [active, setActive] = useState<DialogueItem | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((d, i) => {
          const youtubeId = extractYouTubeId(d.youtubeUrl);
          return (
            <article key={d.id} className={`card-aclpit video-card reveal ${i % 3 === 1 ? 'reveal-delay-1' : i % 3 === 2 ? 'reveal-delay-2' : ''}`}>
              <div className="placeholder-media">
                <Img src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`} alt="" />
                <button
                  type="button"
                  className="play-btn"
                  aria-label={`Play: ${d.title}`}
                  onClick={() => setActive(d)}
                >
                  <i className="bi bi-play-fill" />
                </button>
              </div>
              <div className="card-body">
                <div className="pub-meta"><span>{d.category}</span></div>
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              </div>
            </article>
          );
        })}
      </div>

      {active && (
        <VideoModal youtubeId={extractYouTubeId(active.youtubeUrl)} title={active.title} onClose={() => setActive(null)} />
      )}
    </>
  );
}
