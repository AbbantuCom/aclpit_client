import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import Img from '@/components/Img';

export const metadata: Metadata = {
  title: 'Services | African Centre for Law and Public Interest Technology',
  description:
    'Research and publications, technical advisory, training, multi stakeholder convening and public interest litigation from ACLPIT.',
};

const services = [
  {
    id: 'research',
    sand: false,
    icon: 'bi-journal-text',
    title: 'Research and Publications',
    lead: 'Independent, high quality research on the legal, regulatory and ethical dimensions of emerging technologies, from artificial intelligence and blockchain to digital identity, data protection and fintech.',
    bullets: ['Research reports, policy briefs and commentary', 'Evidence built for African contexts and challenges', 'Analysis that policymakers can act on'],
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Library shelves filled with legal texts',
    imageFirst: false,
  },
  {
    id: 'advisory',
    sand: true,
    icon: 'bi-clipboard-check',
    title: 'Technical Advisory',
    lead: 'Trusted advice to governments, regulators and public institutions on developing and strengthening legal and policy frameworks that keep pace with technological change while safeguarding rights.',
    bullets: ['Legislative and regulatory drafting support', 'Institutional strengthening for regulators', 'Implementation guidance for new frameworks'],
    image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Advisors in discussion with public officials',
    imageFirst: true,
  },
  {
    id: 'training',
    sand: false,
    icon: 'bi-mortarboard',
    title: 'Training and Capacity Building',
    lead: 'Programmes that equip lawyers, judges, regulators, technologists and policymakers to work confidently at the intersection of law and technology.',
    bullets: ['Judicial and regulatory training programmes', 'Professional development for legal practitioners', 'Knowledge sharing platforms and dialogue'],
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Professional presenting during a training session',
    imageFirst: false,
  },
  {
    id: 'convening',
    sand: true,
    icon: 'bi-people',
    title: 'Convenings and Dialogues',
    lead: 'Multi stakeholder platforms where government, industry, civil society and academia meet to address emerging legal and policy questions in technology.',
    bullets: ['Policy roundtables and expert convenings', 'Cross sector dialogue on emerging questions', 'Coordinated solutions built on shared understanding'],
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Diverse group of professionals in dialogue',
    imageFirst: true,
  },
  {
    id: 'litigation',
    sand: false,
    icon: 'bi-megaphone',
    title: 'Public Interest Litigation and Advocacy',
    lead: 'Where rights are at stake, the Centre pursues accountability through the courts, backed by rigorous legal analysis and principled advocacy.',
    bullets: ['Strategic public interest litigation', 'Legal analysis and amicus support', 'Advocacy for digital rights protection'],
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Legal team preparing case materials together',
    imageFirst: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        breadcrumb="Services"
        title="Our Services"
        description="The Centre moves fluidly between generating evidence, shaping policy, building capacity and, where rights are at stake, pursuing accountability through the courts."
      />

      {services.map((s) => (
        <section key={s.id} id={s.id} className={`section ${s.sand ? 'section-sand' : ''}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`reveal ${s.imageFirst ? 'lg:order-2' : ''}`}>
                <div className="card-icon"><i className={`bi ${s.icon}`} /></div>
                <h2>{s.title}</h2>
                <p className="lead-lg mt-3">{s.lead}</p>
                <ul className="text-[1.15rem]">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              <div className={`reveal reveal-delay-1 ${s.imageFirst ? 'lg:order-1' : ''}`}>
                <div className="split-figure">
                  <Img src={s.image} alt={s.alt} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <ContactCta
        title="Ready to engage our services?"
        description="Tell us about your challenge and we will identify the right combination of research, advice, training or advocacy."
      />
    </>
  );
}
