'use client';

import { useState } from 'react';
import PdfModal from './PdfModal';

/**
 * "Download Company Profile" and "View" buttons for the About page banner.
 * The page only renders this when a profile PDF has been uploaded.
 */
export default function CompanyProfileButtons({ url }: { url: string }) {
  const [viewing, setViewing] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {/* `download` only applies to same-origin files; for files on the media
            host the browser opens the PDF in a new tab instead. */}
        <a className="btn btn-ivory" href={url} download target="_blank" rel="noopener noreferrer">
          <i className="bi bi-download me-2" />
          Download Company Profile
        </a>
        <button type="button" className="btn btn-outline-ivory" onClick={() => setViewing(true)}>
          <i className="bi bi-eye me-2" />
          View
        </button>
      </div>

      {viewing && (
        <PdfModal
          title="Company Profile"
          previewUrl={url}
          downloadUrl={url}
          onClose={() => setViewing(false)}
        />
      )}
    </>
  );
}
