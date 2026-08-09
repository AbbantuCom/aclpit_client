import Link from 'next/link';
import Img from '@/components/Img';
import ContactSection from '@/components/ContactSection';
import { getSection } from '@/lib/content-api';
import { fallbackHero, fallbackAbout, fallbackServices, fallbackPracticeAreas, fallbackContact } from '@/lib/fallback-content';
import { splitHighlight } from '@/lib/text';

export const revalidate = 3600;

// No corresponding admin content section exists for this block yet — it
// stays static until the admin repo's AboutContent model grows a field for it.
const whyItems = [
  { title: 'Independent and non partisan', description: 'We maintain independence from government and commercial interests to preserve the credibility of our research and advocacy.' },
  { title: 'Africa rooted expertise', description: 'Our research and advice are built for African contexts and challenges, not imported from elsewhere.' },
  { title: 'From evidence to accountability', description: 'We move fluidly between generating evidence, shaping policy, building capacity and, where rights are at stake, pursuing accountability through the courts.' },
  { title: 'A convener trusted across sectors', description: 'Government, industry, civil society and academia meet at our table to build shared understanding and coordinated solutions.' },
];
const whyImage = 'https://images.pexels.com/photos/7446599/pexels-photo-7446599.jpeg';

export default async function Home() {
  const [hero, about, services, practiceAreas, contact] = await Promise.all([
    getSection('hero', fallbackHero),
    getSection('about', fallbackAbout),
    getSection('services', fallbackServices),
    getSection('practiceAreas', fallbackPracticeAreas),
    getSection('contact', fallbackContact),
  ]);

  const sortedServices = [...services].sort((a, b) => a.order - b.order);
  const sortedPracticeAreas = [...practiceAreas].sort((a, b) => a.order - b.order);
  const title = splitHighlight(hero.title, hero.titleHighlight);

  return (
    <>
      {/* ===================== Hero ===================== */}
      <header className="hero">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="kicker">{hero.kicker}</span>
              <h1>
                {title.before}
                {title.highlight && <span>{title.highlight}</span>}
                {title.after}
              </h1>
              <div className="arch-divider" aria-hidden="true"><span></span><span></span></div>
              <p className="lead-lg">{hero.description}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link className="btn btn-wine" href={hero.primaryCtaHref}>{hero.primaryCtaText}</Link>
                <Link className="btn btn-outline-wine" href={hero.secondaryCtaHref}>{hero.secondaryCtaText}</Link>
              </div>
            </div>
            <div>
              <div className="hero-figure reveal reveal-delay-1">
                <div className="frame">
                  <Img src={hero.image} alt="ACLPIT" />
                </div>
                <div className="badge-arch">
                  <strong>{hero.visionLabel}</strong>
                  {hero.visionText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== About Preview ===================== */}
      <section className="section section-sand" id="about-preview">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="split-figure">
                <Img src={about.image} alt="ACLPIT team" />
              </div>
            </div>
            <div className="lg:col-span-7 reveal reveal-delay-1">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2>{about.title}</h2>
              <p className="lead-lg mt-3">{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
              <Link className="btn btn-outline-wine mt-3" href="/about">Read Our Full Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Practice Areas Preview ===================== */}
      <section className="section" id="practice-preview">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow">Practice Areas</span>
            <h2>Six pillars of law and public interest technology</h2>
            <p className="lead-lg mx-auto" style={{ maxWidth: 760 }}>
              Each pillar addresses a distinct but interconnected dimension of digital transformation across the
              continent.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPracticeAreas.map((p) => (
              <div key={p.id} className="card-aclpit reveal">
                <div className="card-body">
                  <div className="card-icon"><i className={`bi ${p.icon}`} /></div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <Link className="card-link" href={`/practice-areas#${p.anchor}`}>Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Why Us ===================== */}
      <section className="section section-sand" id="why-us">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="eyebrow">Why ACLPIT</span>
              <h2>Legal rigour with technological literacy</h2>
              <p className="lead-lg mt-3">
                Our position between policymakers, technologists, regulators and communities is what makes our work
                possible. It is also what makes it credible.
              </p>
              {whyItems.map((item) => (
                <div className="why-item" key={item.title}>
                  <div className="why-mark" aria-hidden="true"></div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal reveal-delay-1">
              <div className="split-figure">
                <Img src={whyImage} alt="Professional presenting to colleagues in a modern office" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Services Preview ===================== */}
      <section className="section section-wine" id="services-preview">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow on-dark">What We Do</span>
            <h2>Services that carry ideas into impact</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.map((s, i) => (
              <div
                key={s.id}
                className={`card-aclpit reveal ${i === 3 ? 'lg:col-start-2' : ''}`}
              >
                <div className="card-body">
                  <div className="card-icon"><i className={`bi ${s.icon}`} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <Link className="card-link" href={`/services#${s.anchor}`}>Explore</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14 reveal">
            <Link className="btn btn-ivory" href="/services">View All Services</Link>
          </div>
        </div>
      </section>

      <ContactSection data={contact} />
    </>
  );
}
