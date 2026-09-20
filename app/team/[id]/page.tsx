import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Img from '@/components/Img';
import ContactCta from '@/components/ContactCta';
import { getSection } from '@/lib/content-api';
import { fallbackTeam } from '@/lib/fallback-content';
import { firstName } from '@/lib/text';
import type { TeamMember } from '@/types';

export const revalidate = 3600;

async function findMember(id: string): Promise<TeamMember | undefined> {
  const team = await getSection('team', fallbackTeam);
  return team.find((m) => m.id === id);
}

// No generateStaticParams: it runs without an HTTP request, so it cannot call
// getSection(), which reads draft mode. The page is rendered on demand instead —
// the underlying content fetch is still cached for an hour and tag-revalidated,
// so this costs one render per member per hour, and a member added in the admin
// works immediately rather than waiting for a deploy.

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const member = await findMember(id);
  if (!member) return { title: 'Team Member | African Centre for Law and Public Interest Technology' };

  return {
    title: `${member.name} | African Centre for Law and Public Interest Technology`,
    description: member.bio
      ? member.bio.slice(0, 155)
      : `${member.name}, ${member.title} at the African Centre for Law and Public Interest Technology.`,
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await findMember(id);
  if (!member) notFound();

  return (
    <>
      <header className="page-banner">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <p className="breadcrumb-aclpit">
            <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/team">Our Team</Link> &nbsp;/&nbsp; {member.name}
          </p>
          <h1 className="reveal visible">{member.name}</h1>
          <div className="arch-divider on-dark" aria-hidden="true"><span></span><span></span></div>
          {member.title && <p>{member.title}</p>}
        </div>
      </header>

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {member.image && (
              <div className="lg:col-span-5 reveal">
                <div className="split-figure">
                  <Img src={member.image} alt={member.name} />
                </div>
              </div>
            )}

            <div className={`${member.image ? 'lg:col-span-7' : 'lg:col-span-12'} reveal reveal-delay-1`}>
              <span className="eyebrow">Biography</span>
              {member.bio ? (
                // Preserves the paragraph breaks an editor typed in the admin textarea.
                member.bio.split(/\n{2,}/).map((paragraph, i) => (
                  <p key={i} className={i === 0 ? 'lead-lg mt-3' : ''}>{paragraph}</p>
                ))
              ) : (
                <p className="lead-lg mt-3">A biography for {member.name} is coming soon.</p>
              )}

              {(member.email || member.linkedin) && (
                <div className="flex flex-wrap items-center gap-6 mt-6">
                  {member.email && (
                    <a className="card-link" href={`mailto:${member.email}`}>
                      <i className="bi bi-envelope me-1" aria-hidden="true" /> Email
                    </a>
                  )}
                  {member.linkedin && (
                    <a className="card-link" href={member.linkedin} target="_blank" rel="noreferrer">
                      <i className="bi bi-linkedin me-1" aria-hidden="true" /> LinkedIn
                    </a>
                  )}
                </div>
              )}

              <div className="mt-10">
                <Link className="btn btn-outline-wine" href="/team">← Back to the Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta
        title={`Want to work with ${firstName(member.name)} and the team?`}
        description="Tell us about your question, project or partnership and we will point you to the right person at the Centre."
        buttonLabel="Contact Us"
      />
    </>
  );
}
