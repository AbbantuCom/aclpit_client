'use client';

import { useEffect } from 'react';

interface Props {
  previewUrl: string;
  downloadUrl: string;
  title: string;
  onClose: () => void;
}

export default function PdfModal({ previewUrl, downloadUrl, title, onClose }: Props) {
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
      <div className="aclpit-modal-content w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="aclpit-modal-header flex items-center justify-between px-5 py-4">
          <h5 className="!text-inherit !m-0 text-base font-bold">{title}</h5>
          <div className="flex items-center gap-4">
            <a href={downloadUrl} download className="btn btn-wine !py-2 !px-5 !text-xs">
              <i className="bi bi-download me-1" /> Download
            </a>
            <button type="button" onClick={onClose} aria-label="Close" className="text-2xl leading-none text-sand hover:text-white">
              &times;
            </button>
          </div>
        </div>
        <iframe src={previewUrl} title={title} className="pdf-modal-frame" />
      </div>
    </div>
  );
}
