import type { CareersContent, JobPosting } from '@/types';

export const CAREERS_BASE = '/careers';

/** Today in Kampala (EAT), as YYYY-MM-DD — deadlines are dates in the Centre's own time zone. */
function todayInKampala(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Kampala' }).format(new Date());
}

/** The deadline is the last day to apply; no deadline means open until filled. */
export function isJobOpen(job: JobPosting): boolean {
  return !job.deadline || job.deadline >= todayInKampala();
}

/** Jobs visitors can see, in the order set in the dashboard. */
export function liveJobs(careers: CareersContent): JobPosting[] {
  // The API already drops disabled jobs from the published copy, but a draft
  // preview reads the editor's working copy whole — filter here too.
  return [...(careers.jobs ?? [])].filter((j) => j.enabled !== false).sort((a, b) => a.order - b.order);
}

/** "15 January 2027" — dates are stored as YYYY-MM-DD and shown without a time zone shift. */
export function formatJobDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** The address applications for this job go to: its own, or the page-wide one. */
export function applicationEmailFor(job: JobPosting, careers: CareersContent): string {
  return job.applicationEmail?.trim() || careers.applicationEmail?.trim() || '';
}

/** Opens the visitor's email app with the address and a subject naming the job. */
export function applyMailto(email: string, job: JobPosting): string {
  return `mailto:${email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
}
