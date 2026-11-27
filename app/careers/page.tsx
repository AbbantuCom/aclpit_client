import type { Metadata } from 'next';
import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import { getSection } from '@/lib/content-api';
import { fallbackCareers } from '@/lib/fallback-content';
import { CAREERS_BASE, formatJobDate, isJobOpen, liveJobs } from '@/lib/careers';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Careers | African Centre for Law and Public Interest Technology',
  description:
    'Job openings at the African Centre for Law and Public Interest Technology: work at the intersection of law, technology and the public interest across Africa.',
};

export default async function CareersPage() {
  const careers = await getSection('careers', fallbackCareers);
  // Jobs past their deadline drop off the list; their own page says they've closed.
  const openJobs = liveJobs(careers).filter(isJobOpen);
  const email = careers.applicationEmail?.trim();

  return (
    <>
      <PageBanner
        breadcrumb="Get Involved / Careers"
        title="Careers"
        description={careers.intro || fallbackCareers.intro}
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12 reveal">
            <div>
              <span className="eyebrow">Open Positions</span>
              <h2>
                {openJobs.length === 0
                  ? 'No openings right now'
                  : `${openJobs.length} open ${openJobs.length === 1 ? 'position' : 'positions'}`}
              </h2>
            </div>
            {email && (
              <p className="m-0 text-muted">
                Applications go to{' '}
                <a className="text-wine font-bold underline underline-offset-4" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
            )}
          </div>

          {openJobs.length === 0 ? (
            <div className="detail-block text-center reveal" style={{ height: 'auto' }}>
              <p className="lead-lg mx-auto mb-0" style={{ maxWidth: 640 }}>
                We don&rsquo;t have any open positions at the moment. New roles are posted on this page, so please
                check back soon.
                {email && (
                  <>
                    {' '}You are also welcome to send your CV to{' '}
                    <a className="text-wine font-bold underline underline-offset-4" href={`mailto:${email}`}>{email}</a>{' '}
                    for future opportunities.
                  </>
                )}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {openJobs.map((job) => (
                <Link key={job.id} href={`${CAREERS_BASE}/${job.id}`} className="card-aclpit block reveal group">
                  <div className="card-body flex flex-col h-full">
                    <div className="pub-meta mb-3 flex-wrap">
                      {[job.employmentType, job.location, job.department].filter(Boolean).map((m, i) => (
                        <span key={m} className="flex items-center gap-3.5">
                          {i > 0 && <span className="dot" aria-hidden="true" />}
                          {m}
                        </span>
                      ))}
                    </div>
                    <h3>{job.title}</h3>
                    {job.summary && <p>{job.summary}</p>}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
                      <span className="text-sm font-bold text-ink">
                        <i className="bi bi-calendar-event me-2 text-wine" aria-hidden="true" />
                        {job.deadline ? `Apply by ${formatJobDate(job.deadline)}` : 'Open until filled'}
                      </span>
                      <span className="card-link">View Job</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
