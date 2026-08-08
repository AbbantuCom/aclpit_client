import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import PublicationsGrid, { type PublicationEntry } from '@/components/PublicationsGrid';

export const metadata: Metadata = {
  title: 'Publications | African Centre for Law and Public Interest Technology',
  description: 'Research reports, policy briefs and commentary from the African Centre for Law and Public Interest Technology.',
};

const publications: PublicationEntry[] = [
  {
    id: 'borderless-identity',
    driveId: '1IdFuBI1SRZb353gPZqOJB_tWNexyC11c',
    category: 'Policy Brief',
    title: 'Borderless Identity',
    description:
      'This document examines the AfCFTA Digital Trade Protocol, focusing on implementation gaps in cross-border digital identity systems. It highlights challenges regarding mutual recognition, technical standardization, and KYC baselines, recommending mandatory continental assurance standards, trusted identity list criteria, and unified security incident management response frameworks.',
  },
  {
    id: 'e-discovery-litigation',
    driveId: '1G0d0dGr_KJR81e9esAwN46S3sedbsGse',
    category: 'Research Note',
    title: 'E-Discovery and Litigation',
    description:
      'This overview explores electronic discovery and evidence in litigation, explaining electronically stored information, admissibility, and judicial reliability factors. It outlines the seven-stage EDRM framework, addresses data protection balancing under Ugandan law, and emphasizes proportional application to prevent disproportionate financial burdens on smaller individual court litigants.',
  },
  {
    id: 'ip-financial-innovators',
    driveId: '1LJa9TnOPMjBNVwkjAYZLJ47k4pp9m1Oe',
    category: 'Case Analysis',
    title: 'Intellectual Property Protection for Financial Innovators',
    description:
      "Analyzing Kenya's landmark copyright judgment against Safaricom, this article discusses intellectual property protection for African fintech innovators. It outlines core IP categories, demonstrates how copyright protects specific product expressions rather than raw ideas, and urges Ugandan founders to thoroughly document and legalise software innovations early.",
  },
];

export default function PublicationsPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Publications"
        title="Publications"
        description="Independent research on the legal, regulatory and ethical dimensions of emerging technologies, built for African contexts and challenges."
      />

      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <PublicationsGrid items={publications} />
          <div className="text-center mt-14 reveal">
            <p className="lead-lg mx-auto" style={{ maxWidth: 680 }}>
              The Centre&rsquo;s research reports, policy briefs and commentary will be published here. Subscribe to
              our updates to be notified when new work is released.
            </p>
            <Link className="btn btn-wine mt-2" href="/#contact">Get Notified</Link>
          </div>
        </div>
      </section>

      <ContactCta
        title="Looking for research on a specific question?"
        description="We welcome enquiries about our research agenda, commissioned studies and collaboration."
      />
    </>
  );
}
