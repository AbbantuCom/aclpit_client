'use client';

import { useState } from 'react';
import PdfModal from './PdfModal';

interface Props {
  url: string;
  title: string;
  className?: string;
  label?: string;
  /** Same-origin route that saves the file; the viewer's Download button uses it. */
  downloadUrl?: string;
  downloadFileName?: string;
}

/** Opens a PDF in the site's viewer, which has its own Download button. */
export default function ViewPdfButton({
  url,
  title,
  className = 'btn btn-wine',
  label = 'View PDF',
  downloadUrl,
  downloadFileName,
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        <i className="bi bi-file-earmark-pdf me-2" aria-hidden="true" />
        {label}
      </button>
      {open && (
        <PdfModal
          title={title}
          previewUrl={url}
          downloadUrl={downloadUrl ?? url}
          downloadFileName={downloadUrl ? downloadFileName : undefined}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
