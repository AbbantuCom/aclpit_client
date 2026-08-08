import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import Img from '@/components/Img';
import { getSection } from '@/lib/content-api';
import { fallbackAbout } from '@/lib/fallback-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About Us | African Centre for Law and Public Interest Technology',
  description:
    "Learn about ACLPIT's background, vision, mission, objectives and governance: an independent, Africa rooted centre for law and public interest technology.",
};

export default async function AboutPage() {
  const about = await getSection('about', fallbackAbout);
  const objectives = about.objectives;
  const stakeholders = about.stakeholders;

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
              <span className="eyebrow">{about.backgroundEyebrow}</span>
              <h2>{about.backgroundTitle}</h2>
              <p className="lead-lg mt-3">{about.backgroundParagraph1}</p>
              <p>{about.backgroundParagraph2}</p>
              <p>{about.backgroundParagraph3}</p>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="split-figure">
                <Img src={about.backgroundImage} alt="Team of professionals collaborating in a modern workspace" />
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
              <p className="lead-lg mb-0">{about.visionText}</p>
            </div>
            <div className="detail-block reveal reveal-delay-1">
              <div className="card-icon"><i className="bi bi-compass" /></div>
              <h2 className="h3">Our Mission</h2>
              <p className="lead-lg mb-0">{about.missionText}</p>
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
                className={`md:col-span-6 reveal ${i === objectives.length - 1 && objectives.length % 2 === 1 ? 'md:col-start-4' : ''}`}
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
              <span className="eyebrow">{about.governanceEyebrow}</span>
              <h2>{about.governanceTitle}</h2>
              <p className="lead-lg mt-3">{about.governanceParagraph1}</p>
              <p>{about.governanceParagraph2}</p>
              <div className="mt-4">
                {about.governanceValues.map((v) => (
                  <span className="value-chip" key={v}>{v}</span>
                ))}
              </div>
            </div>
            <div className="lg:order-1 reveal reveal-delay-1">
              <div className="split-figure">
                <Img src={about.governanceImage} alt="Board members in a governance meeting" />
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
            {stakeholders.map((s, i) => {
              const span = i < 3 ? 'lg:col-span-4' : 'lg:col-span-6';
              const delay = i === 1 || i === 4 ? 'reveal-delay-1' : i === 2 ? 'reveal-delay-2' : '';
              return (
                <div key={s.title} className={`md:col-span-6 ${span} reveal ${delay}`}>
                  <div className="stakeholder-row">
                    <i className={`bi ${s.icon}`} />
                    <div>
                      <h3 className="h5">{s.title}</h3>
                      <p className="mb-0">{s.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
