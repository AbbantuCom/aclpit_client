'use client';

import { useState } from 'react';
import PdfModal from './PdfModal';

/** Opens a PDF in the site's viewer, which has its own Download button. */
export default function ViewPdfButton({ url, title, className = 'btn btn-wine' }: { url: string; title: string; className?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <i className="bi bi-file-earmark-pdf me-2" aria-hidden="true" />
        View PDF
      </button>
      {open && <PdfModal title={title} previewUrl={url} downloadUrl={url} onClose={() => setOpen(false)} />}
    </>
  );
}
