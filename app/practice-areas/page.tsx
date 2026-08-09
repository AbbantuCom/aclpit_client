import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import { getSection } from '@/lib/content-api';
import { fallbackPracticeAreas } from '@/lib/fallback-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Practice Areas | African Centre for Law and Public Interest Technology',
  description:
    "ACLPIT's six thematic pillars: data protection, AI accountability, digital justice, fintech regulation, blockchain registries and digital rights.",
};

export default async function PracticeAreasPage() {
  const areas = await getSection('practiceAreas', fallbackPracticeAreas);
  const sorted = [...areas].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageBanner
        breadcrumb="Practice Areas"
        title="Our Practice Areas"
        description="The Centre organises its work around six thematic pillars, each addressing a distinct but interconnected dimension of law and public interest technology in Africa."
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-6">
            {sorted.map((a, i) => (
              <div key={a.id} id={a.anchor} className={`reveal ${i % 2 === 1 ? 'reveal-delay-1' : ''}`}>
                <div className="detail-block">
                  <div className="card-icon"><i className={`bi ${a.icon}`} /></div>
                  <h2 className="h3">{a.title}</h2>
                  <p>{a.description}</p>
                  <ul>
                    {a.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        title="Need expertise in one of these areas?"
        description="Our team supports governments, regulators, companies and civil society across all six pillars."
      />
    </>
  );
}
