import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';

export const metadata: Metadata = {
  title: 'Practice Areas | African Centre for Law and Public Interest Technology',
  description:
    "ACLPIT's six thematic pillars: data protection, AI accountability, digital justice, fintech regulation, blockchain registries and digital rights.",
};

const areas = [
  {
    id: 'data',
    icon: 'bi-shield-lock',
    title: 'Data Protection and Privacy',
    description: 'Supporting the development and enforcement of data protection laws across the continent, and advising public and private actors on responsible data governance.',
    bullets: ['Data protection law development and enforcement support', 'Responsible data governance frameworks', 'Privacy impact assessment and compliance guidance'],
  },
  {
    id: 'ai',
    icon: 'bi-cpu',
    title: 'Artificial Intelligence and Algorithmic Accountability',
    description: 'Examining the legal and ethical implications of AI deployment in both public and private sectors, so that algorithmic systems remain accountable to the people they affect.',
    bullets: ['Legal and ethical analysis of AI systems', 'Algorithmic accountability in public sector deployment', 'AI governance frameworks for African contexts'],
  },
  {
    id: 'justice',
    icon: 'bi-bank',
    title: 'Digital Justice and Legal Technology',
    description: 'Advancing the use of technology to improve access to justice, court efficiency and legal service delivery across African justice systems.',
    bullets: ['Digital justice initiatives and court modernisation', 'Legal technology that reduces cost and delay', 'Responsible innovation in legal service delivery'],
  },
  {
    id: 'fintech',
    icon: 'bi-phone',
    title: 'Fintech, Digital Finance and Consumer Protection',
    description: 'Supporting sound regulation of mobile money, digital lending and other financial technologies that millions of Africans rely on every day.',
    bullets: ['Mobile money and digital finance regulation', 'Digital lending oversight and fair practice', 'Consumer protection in financial technology'],
  },
  {
    id: 'blockchain',
    icon: 'bi-diagram-3',
    title: 'Blockchain and Public Registries',
    description: 'Exploring the application of blockchain and distributed ledger technology to land administration, business registration and other public records.',
    bullets: ['Distributed ledger applications for land administration', 'Business registration and public record systems', 'Legal frameworks for blockchain adoption'],
  },
  {
    id: 'rights',
    icon: 'bi-globe-europe-africa',
    title: 'Digital Rights and Internet Governance',
    description: 'Protecting freedom of expression, association and access to information in digital spaces, and shaping internet governance that serves the public.',
    bullets: ['Freedom of expression and association online', 'Access to information in digital spaces', 'Public interest participation in internet governance'],
  },
];

export default function PracticeAreasPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Practice Areas"
        title="Our Practice Areas"
        description="The Centre organises its work around six thematic pillars, each addressing a distinct but interconnected dimension of law and public interest technology in Africa."
      />

      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {areas.map((a, i) => (
              <div key={a.id} id={a.id} className={`reveal ${i % 2 === 1 ? 'reveal-delay-1' : ''}`}>
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
