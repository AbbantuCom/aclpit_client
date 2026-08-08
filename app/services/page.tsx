import type { Metadata } from 'next';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import Img from '@/components/Img';
import { getSection } from '@/lib/content-api';
import { fallbackServices } from '@/lib/fallback-content';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Services | African Centre for Law and Public Interest Technology',
  description:
    'Research and publications, technical advisory, training, multi stakeholder convening and public interest litigation from ACLPIT.',
};

export default async function ServicesPage() {
  const services = await getSection('services', fallbackServices);
  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageBanner
        breadcrumb="Services"
        title="Our Services"
        description="The Centre moves fluidly between generating evidence, shaping policy, building capacity and, where rights are at stake, pursuing accountability through the courts."
      />

      {sorted.map((s, i) => {
        const sand = i % 2 === 1;
        const imageFirst = i % 2 === 1;
        return (
          <section key={s.id} id={s.anchor} className={`section ${sand ? 'section-sand' : ''}`}>
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className={`reveal ${imageFirst ? 'lg:order-2' : ''}`}>
                  <div className="card-icon"><i className={`bi ${s.icon}`} /></div>
                  <h2>{s.title}</h2>
                  <p className="lead-lg mt-3">{s.description}</p>
                  <ul className="text-[1.15rem]">
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className={`reveal reveal-delay-1 ${imageFirst ? 'lg:order-1' : ''}`}>
                  <div className="split-figure">
                    <Img src={s.image} alt={s.imageAlt} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <ContactCta
        title="Ready to engage our services?"
        description="Tell us about your challenge and we will identify the right combination of research, advice, training or advocacy."
      />
    </>
  );
}
