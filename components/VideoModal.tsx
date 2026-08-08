'use client';

import { useEffect } from 'react';

interface Props {
  youtubeId: string;
  title: string;
  onClose: () => void;
}

export default function VideoModal({ youtubeId, title, onClose }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1090] bg-ink/70 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div className="aclpit-modal-content w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="aclpit-modal-header flex items-center justify-between px-5 py-4">
          <h5 className="!text-inherit !m-0 text-base font-bold">{title}</h5>
          <button type="button" onClick={onClose} aria-label="Close" className="text-2xl leading-none text-sand hover:text-white">
            &times;
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
