import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import PublicationsGrid from '@/components/PublicationsGrid';
import { getSection } from '@/lib/content-api';
import { fallbackPublications } from '@/lib/fallback-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Publications | African Centre for Law and Public Interest Technology',
  description: 'Research reports, policy briefs and commentary from the African Centre for Law and Public Interest Technology.',
};

export default async function PublicationsPage() {
  const publications = await getSection('publications', fallbackPublications);
  const sorted = [...publications].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageBanner
        breadcrumb="Publications"
        title="Publications"
        description="Independent research on the legal, regulatory and ethical dimensions of emerging technologies, built for African contexts and challenges."
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <PublicationsGrid items={sorted} />
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
