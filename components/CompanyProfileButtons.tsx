'use client';

import { useState } from 'react';
import PdfModal from './PdfModal';
import DirectDownloadLink from './DirectDownloadLink';

/** Same-origin route (app/api/company-profile) that returns the PDF as an attachment. */
export const COMPANY_PROFILE_DOWNLOAD = '/api/company-profile';
export const COMPANY_PROFILE_FILENAME = 'ACLPIT-Company-Profile.pdf';

/**
 * "Download Company Profile" and "View" buttons for the About page banner.
 * The page only renders this when a profile PDF has been uploaded.
 */
export default function CompanyProfileButtons({ url }: { url: string }) {
  const [viewing, setViewing] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <DirectDownloadLink
          className="btn btn-ivory"
          href={COMPANY_PROFILE_DOWNLOAD}
          filename={COMPANY_PROFILE_FILENAME}
        >
          <i className="bi bi-download me-2" />
          Download Company Profile
        </DirectDownloadLink>
        <button type="button" className="btn btn-outline-ivory" onClick={() => setViewing(true)}>
          <i className="bi bi-eye me-2" />
          View
        </button>
      </div>

      {viewing && (
        <PdfModal
          title="Company Profile"
          previewUrl={url}
          downloadUrl={COMPANY_PROFILE_DOWNLOAD}
          downloadFileName={COMPANY_PROFILE_FILENAME}
          onClose={() => setViewing(false)}
        />
      )}
    </>
  );
}
