import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSection } from '@/lib/content-api';
import { fallbackCareers } from '@/lib/fallback-content';
import { CAREERS_BASE, applicationEmailFor, applyMailto, formatJobDate, isJobOpen, liveJobs } from '@/lib/careers';

export const revalidate = 3600;

// Rendered on demand rather than with generateStaticParams, like the team
// biography pages: getSection() reads draft mode, which needs a request, and a
// job added in the dashboard works as soon as it's published.

async function findJob(id: string) {
  const careers = await getSection('careers', fallbackCareers);
  const job = liveJobs(careers).find((j) => j.id === id);
  return job ? { job, careers } : null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const found = await findJob(id);
  if (!found) return { title: 'Careers | African Centre for Law and Public Interest Technology' };
  const { job } = found;
  return {
    title: `${job.title} | Careers | African Centre for Law and Public Interest Technology`,
    description: (job.summary || job.description || `${job.title} at the African Centre for Law and Public Interest Technology.`).slice(0, 155),
  };
}

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await findJob(id);
  if (!found) notFound();
  const { job, careers } = found;

  const open = isJobOpen(job);
  const email = applicationEmailFor(job, careers);
  const details = [
    { label: 'Type', value: job.employmentType, icon: 'bi-briefcase' },
    { label: 'Location', value: job.location, icon: 'bi-geo-alt' },
    { label: 'Department', value: job.department, icon: 'bi-diagram-3' },
    { label: 'Posted', value: job.postedDate ? formatJobDate(job.postedDate) : '', icon: 'bi-calendar' },
    { label: 'Deadline', value: job.deadline ? formatJobDate(job.deadline) : 'Open until filled', icon: 'bi-calendar-event' },
  ].filter((d) => d.value);

  return (
    <>
      <header className="page-banner">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <p className="breadcrumb-aclpit">
            <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href={CAREERS_BASE}>Careers</Link> &nbsp;/&nbsp; {job.title}
          </p>
          <h1 className="reveal visible">{job.title}</h1>
          <div className="arch-divider on-dark" aria-hidden="true"><span></span><span></span></div>
          <p>{[job.employmentType, job.location].filter(Boolean).join(' · ')}</p>
        </div>
      </header>

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* ── The job ── */}
            <div className="lg:col-span-8 space-y-12">
              {!open && (
                <div role="status" className="detail-block" style={{ height: 'auto', padding: 24 }}>
                  <p className="m-0 font-bold text-wine">
                    <i className="bi bi-info-circle me-2" aria-hidden="true" />
                    Applications for this position closed on {formatJobDate(job.deadline)}.
                  </p>
                </div>
              )}

              {job.description && (
                <div className="reveal">
                  <span className="eyebrow">About the Role</span>
                  {/* Keeps the paragraph breaks typed in the dashboard. */}
                  {job.description.split(/\n{2,}/).map((paragraph, i) => (
                    <p key={i} className={i === 0 ? 'lead-lg mt-3' : ''}>{paragraph}</p>
                  ))}
                </div>
              )}

              {job.responsibilities.length > 0 && (
                <div className="reveal">
                  <span className="eyebrow">Responsibilities</span>
                  <ul className="mt-5 space-y-3 list-disc pl-5 text-muted marker:text-wine">
                    {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}

              {job.requirements.length > 0 && (
                <div className="reveal">
                  <span className="eyebrow">Requirements</span>
                  <ul className="mt-5 space-y-3 list-disc pl-5 text-muted marker:text-wine">
                    {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}

              <div>
                <Link className="btn btn-outline-wine" href={CAREERS_BASE}>← All Open Positions</Link>
              </div>
            </div>

            {/* ── Details and how to apply ── */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="detail-block" style={{ height: 'auto', padding: 32 }}>
                <h2 className="!text-xl !mb-5">Job Details</h2>
                <dl className="space-y-4 m-0">
                  {details.map((d) => (
                    <div key={d.label} className="flex gap-3">
                      <i className={`bi ${d.icon} text-wine mt-0.5`} aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{d.label}</dt>
                        <dd className="m-0 font-bold text-ink">{d.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <hr className="my-6 border-wine/20" />

                {open ? (
                  <>
                    <h3 className="!text-lg !mb-2">How to Apply</h3>
                    {careers.howToApply && <p className="text-muted text-[0.95rem]">{careers.howToApply}</p>}
                    {email ? (
                      <>
                        <a className="btn btn-wine w-full text-center mt-2" href={applyMailto(email, job)}>
                          <i className="bi bi-envelope me-2" aria-hidden="true" />
                          Apply by Email
                        </a>
                        <p className="text-sm text-muted mt-3 mb-0">
                          Or email{' '}
                          <a className="text-wine font-bold underline underline-offset-4 [overflow-wrap:anywhere]" href={applyMailto(email, job)}>{email}</a>
                          {' '}with &ldquo;Application: {job.title}&rdquo; as the subject.
                        </p>
                      </>
                    ) : (
                      <p className="text-muted mb-0">Application details will be added shortly.</p>
                    )}
                  </>
                ) : (
                  <p className="text-muted mb-0">
                    This position is no longer accepting applications.{' '}
                    <Link className="text-wine font-bold underline underline-offset-4" href={CAREERS_BASE}>See current openings</Link>.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
