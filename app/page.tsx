import Link from 'next/link';
import Img from '@/components/Img';
import ContactSection from '@/components/ContactSection';

const practiceAreas = [
  { icon: 'bi-shield-lock', title: 'Data Protection and Privacy', description: 'Supporting the development and enforcement of data protection laws and advising on responsible data governance.', href: '/practice-areas#data' },
  { icon: 'bi-cpu', title: 'AI and Algorithmic Accountability', description: 'Examining the legal and ethical implications of AI deployment across public and private sectors.', href: '/practice-areas#ai' },
  { icon: 'bi-bank', title: 'Digital Justice and Legal Technology', description: 'Advancing technology that improves access to justice, court efficiency and legal service delivery.', href: '/practice-areas#justice' },
  { icon: 'bi-phone', title: 'Fintech, Competition, and Consumer Protection', description: 'Supporting sound regulation of mobile money, digital lending and other financial technologies.', href: '/practice-areas#fintech' },
  { icon: 'bi-diagram-3', title: 'Blockchain and Public Registries', description: 'Exploring distributed ledger technology for land administration, business registration and public records.', href: '/practice-areas#blockchain' },
  { icon: 'bi-globe-europe-africa', title: 'Digital Rights and Internet Governance', description: 'Protecting freedom of expression, association and access to information in digital spaces.', href: '/practice-areas#rights' },
];

const whyItems = [
  { title: 'Independent and non partisan', description: 'We maintain independence from government and commercial interests to preserve the credibility of our research and advocacy.' },
  { title: 'Africa rooted expertise', description: 'Our research and advice are built for African contexts and challenges, not imported from elsewhere.' },
  { title: 'From evidence to accountability', description: 'We move fluidly between generating evidence, shaping policy, building capacity and, where rights are at stake, pursuing accountability through the courts.' },
  { title: 'A convener trusted across sectors', description: 'Government, industry, civil society and academia meet at our table to build shared understanding and coordinated solutions.' },
];

const services = [
  { icon: 'bi-journal-text', title: 'Research and Publications', description: 'Independent, high quality research on the legal, regulatory and ethical dimensions of emerging technologies.', href: '/services#research' },
  { icon: 'bi-clipboard-check', title: 'Technical Advisory', description: 'Advice to governments, regulators and public institutions on legal and policy frameworks that keep pace with change.', href: '/services#advisory' },
  { icon: 'bi-mortarboard', title: 'Training and Capacity Building', description: 'Programmes for lawyers, judges, regulators, technologists and policymakers on the intersection of law and technology.', href: '/services#training' },
  { icon: 'bi-people', title: 'Convenings and Dialogues', description: 'Multi stakeholder platforms where government, industry, civil society and academia solve problems together.', href: '/services#convening' },
  { icon: 'bi-megaphone', title: 'Public Interest Litigation', description: 'Strategic litigation and advocacy that protect digital rights when they are at stake.', href: '/services#litigation' },
];

export default function Home() {
  return (
    <>
      {/* ===================== Hero ===================== */}
      <header className="hero">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="reveal">
              <span className="kicker">Independent. Africa Rooted. Public Interest First.</span>
              <h1>Where African law meets <span>technology</span>, we stand for the public interest.</h1>
              <div className="arch-divider" aria-hidden="true"><span></span><span></span></div>
              <p className="lead-lg">
                The African Centre for Law and Public Interest Technology researches, litigates, advises and convenes
                on the legal and regulatory dimensions of technology, so that Africa&rsquo;s digital transformation is
                grounded in the rule of law, respects fundamental rights and serves every community.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link className="btn btn-wine" href="/#contact">Work With Us</Link>
                <Link className="btn btn-outline-wine" href="/practice-areas">Explore Our Focus</Link>
              </div>
            </div>
            <div>
              <div className="hero-figure reveal reveal-delay-1">
                <div className="frame">
                  <Img
                    src="https://images.pexels.com/photos/1367272/pexels-photo-1367272.jpeg"
                    alt="Black professionals collaborating in a modern workspace"
                  />
                </div>
                <div className="badge-arch">
                  <strong>Our Vision</strong>
                  An Africa where law and technology work together to advance justice, protect rights and drive
                  inclusive development for all.
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== About Preview ===================== */}
      <section className="section section-sand" id="about-preview">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 reveal">
              <div className="split-figure">
                <Img
                  src="https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg"
                  alt="Professionals in discussion at a boardroom table"
                />
              </div>
            </div>
            <div className="lg:col-span-7 reveal reveal-delay-1">
              <span className="eyebrow">About the Centre</span>
              <h2>An institution built for a defining challenge of this decade</h2>
              <p className="lead-lg mt-3">
                Africa&rsquo;s rapid digitalisation is reshaping economies and societies faster than the legal
                frameworks meant to govern them. ACLPIT was conceived to close that gap: an independent, Africa
                rooted centre that combines rigorous legal expertise with a genuine understanding of technology.
              </p>
              <p>
                We bridge the divide between policymakers, technologists, regulators and the communities affected by
                digital transformation, so that law becomes a tool not only for managing risk but for enabling
                responsible innovation and protecting fundamental rights, particularly for underserved and
                vulnerable communities.
              </p>
              <Link className="btn btn-outline-wine mt-3" href="/about">Read Our Full Story</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Practice Areas Preview ===================== */}
      <section className="section" id="practice-preview">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow">Practice Areas</span>
            <h2>Six pillars of law and public interest technology</h2>
            <p className="lead-lg mx-auto" style={{ maxWidth: 760 }}>
              Each pillar addresses a distinct but interconnected dimension of digital transformation across the
              continent.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {practiceAreas.map((p) => (
              <div key={p.href} className="card-aclpit reveal">
                <div className="card-body">
                  <div className="card-icon"><i className={`bi ${p.icon}`} /></div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <Link className="card-link" href={p.href}>Learn More</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== Why Us ===================== */}
      <section className="section section-sand" id="why-us">
        <div className="max-w-7xl mx-auto px-6">
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
                <Img
                  src="https://images.pexels.com/photos/7446599/pexels-photo-7446599.jpeg"
                  alt="Professional presenting to colleagues in a modern office"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Services Preview ===================== */}
      <section className="section section-wine" id="services-preview">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <span className="eyebrow on-dark">What We Do</span>
            <h2>Services that carry ideas into impact</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div
                key={s.href}
                className={`card-aclpit reveal ${i === 3 ? 'lg:col-start-2' : ''}`}
              >
                <div className="card-body">
                  <div className="card-icon"><i className={`bi ${s.icon}`} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <Link className="card-link" href={s.href}>Explore</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-14 reveal">
            <Link className="btn btn-ivory" href="/services">View All Services</Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
