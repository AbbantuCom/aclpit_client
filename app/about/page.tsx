import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import Img from '@/components/Img';

export const metadata: Metadata = {
  title: 'About Us | African Centre for Law and Public Interest Technology',
  description:
    "Learn about ACLPIT's background, vision, mission, objectives and governance: an independent, Africa rooted centre for law and public interest technology.",
};

const objectives = [
  { icon: 'bi-search', title: 'Independent research', description: 'High quality research on the legal, regulatory and ethical dimensions of emerging technologies, with a specific focus on African contexts and challenges.' },
  { icon: 'bi-clipboard-check', title: 'Sound policy advice', description: 'Advising governments, regulators and public institutions on frameworks that keep pace with technological change while safeguarding rights.' },
  { icon: 'bi-bank', title: 'Access to justice', description: 'Promoting responsible legal technology, digital justice initiatives and innovations that reduce cost and delay in African justice systems.' },
  { icon: 'bi-shield-check', title: 'Digital rights protection', description: 'Protecting privacy, data protection, freedom of expression and consumer rights through legal analysis, advocacy and, where appropriate, public interest litigation.' },
  { icon: 'bi-mortarboard', title: 'Capacity building', description: 'Training lawyers, judges, regulators, technologists and policymakers on the intersection of law and technology.' },
  { icon: 'bi-people', title: 'Multi stakeholder dialogue', description: 'Convening government, industry, civil society and academia to foster shared understanding and coordinated solutions.' },
  { icon: 'bi-lightbulb', title: 'Responsible innovation', description: 'Working with technology developers and businesses to embed legal and ethical compliance into the design and deployment of new technologies.' },
];

const stakeholders = [
  { icon: 'bi-building', title: 'Governments and regulators', description: 'Seeking sound, implementable legal and policy frameworks for emerging technologies.', span: 'lg:col-span-4' },
  { icon: 'bi-bank2', title: 'Judiciaries and justice institutions', description: 'Modernising service delivery and improving access to justice.', span: 'lg:col-span-4' },
  { icon: 'bi-rocket-takeoff', title: 'Technology companies and innovators', description: 'Seeking legal clarity and support for responsible product development.', span: 'lg:col-span-4' },
  { icon: 'bi-heart', title: 'Civil society and communities', description: 'Whose rights are affected by digital transformation.', span: 'lg:col-span-6' },
  { icon: 'bi-journal-bookmark', title: 'Practitioners, academics and students', description: 'Working at the intersection of law and technology.', span: 'lg:col-span-6' },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner
        breadcrumb="About Us"
        title="About the Centre"
        description="An independent, Africa rooted institution dedicated to shaping the legal, regulatory and policy environment for technology in a way that serves the public interest, protects fundamental rights and supports sustainable innovation across the continent."
      />

      {/* Background and Rationale */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="eyebrow">Background and Rationale</span>
              <h2>Born from a gap, built for an opportunity</h2>
              <p className="lead-lg mt-3">
                Mobile money, digital identity systems, artificial intelligence, blockchain and e governance
                platforms are reshaping African economies and societies at a pace that has outstripped the legal
                and regulatory frameworks meant to govern them.
              </p>
              <p>
                That gap creates real risks: unresolved data protection questions, weak consumer and digital rights
                protections, uneven access to justice, and regulation that struggles to keep pace with innovation.
                But it also presents an opportunity. Law can be a tool not only for managing risk, but for enabling
                responsible innovation, protecting the public interest and ensuring the benefits of technology are
                equitably distributed.
              </p>
              <p>
                Realising that opportunity requires an institution that combines rigorous legal expertise with a
                genuine understanding of technology. The African Centre for Law and Public Interest Technology is
                conceived as that institution.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="split-figure">
                <Img
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Team of professionals collaborating in a modern workspace"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section section-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="detail-block reveal">
              <div className="card-icon"><i className="bi bi-eye" /></div>
              <h2 className="h3">Our Vision</h2>
              <p className="lead-lg mb-0">
                An Africa where law and technology work together to advance justice, protect rights and drive
                inclusive development for all.
              </p>
            </div>
            <div className="detail-block reveal reveal-delay-1">
              <div className="card-icon"><i className="bi bi-compass" /></div>
              <h2 className="h3">Our Mission</h2>
              <p className="lead-lg mb-0">
                To research, litigate, advise and convene on the legal and regulatory dimensions of technology in
                Africa, so that digital transformation is grounded in the rule of law, respects fundamental rights
                and serves the public interest, particularly for underserved and vulnerable communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Objectives */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow">Our Objectives</span>
            <h2>What we set out to achieve</h2>
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            {objectives.map((o, i) => (
              <div
                key={o.title}
                className={`md:col-span-6 reveal ${i === objectives.length - 1 ? 'md:col-start-4' : ''}`}
              >
                <div className="stakeholder-row">
                  <i className={`bi ${o.icon}`} />
                  <div>
                    <h3 className="h5">{o.title}</h3>
                    <p className="mb-0">{o.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="section section-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2 reveal">
              <span className="eyebrow">Governance</span>
              <h2>Independent by design</h2>
              <p className="lead-lg mt-3">
                ACLPIT is an independent, non partisan institution governed by a board drawn from law, technology,
                academia and civil society, with a small core secretariat led by an Executive Director.
              </p>
              <p>
                The Centre maintains independence from government and commercial interests to preserve the
                credibility of its research and advocacy, while actively partnering with governments, regulators,
                technology companies and civil society to achieve shared goals.
              </p>
              <div className="mt-4">
                <span className="value-chip">Independent</span>
                <span className="value-chip">Non Partisan</span>
                <span className="value-chip">Africa Rooted</span>
                <span className="value-chip">Rights Centred</span>
              </div>
            </div>
            <div className="lg:order-1 reveal reveal-delay-1">
              <div className="split-figure">
                <Img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Board members in a governance meeting"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow">Who We Serve</span>
            <h2>Stakeholders across the African legal and technology ecosystem</h2>
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            {stakeholders.map((s, i) => (
              <div key={s.title} className={`md:col-span-6 ${s.span} reveal ${i === 1 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : i === 4 ? 'reveal-delay-1' : ''}`}>
                <div className="stakeholder-row">
                  <i className={`bi ${s.icon}`} />
                  <div>
                    <h3 className="h5">{s.title}</h3>
                    <p className="mb-0">{s.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        title="Partner with an institution built for this moment"
        description="Talk to us about research collaboration, advisory support, training or convening opportunities."
      />
    </>
  );
}
