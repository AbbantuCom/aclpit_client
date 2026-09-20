import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import TeamGrid from '@/components/TeamGrid';
import { getSection } from '@/lib/content-api';
import { fallbackTeam } from '@/lib/fallback-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Team | African Centre for Law and Public Interest Technology',
  description:
    'The people behind the African Centre for Law and Public Interest Technology — lawyers, researchers and policy specialists working at the intersection of law and technology in Africa.',
};

export default async function TeamPage() {
  const team = await getSection('team', fallbackTeam);
  // `order` is the hierarchy an editor set by dragging rows in the admin panel.
  const sorted = [...team].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageBanner
        breadcrumb="Our Team"
        title="Our Team"
        description="Lawyers, researchers and policy specialists working at the intersection of law, technology and the public interest in Africa."
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          {sorted.length > 0 ? (
            <TeamGrid members={sorted} />
          ) : (
            <p className="lead-lg mx-auto text-center" style={{ maxWidth: 680 }}>
              Our team will be introduced here shortly.
            </p>
          )}
        </div>
      </section>

      <ContactCta
        title="Interested in working with us?"
        description="We welcome enquiries from researchers, practitioners and partners who share our commitment to the public interest."
      />
    </>
  );
}
