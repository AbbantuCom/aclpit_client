import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import ContactCta from '@/components/ContactCta';
import PublicationsGrid from '@/components/PublicationsGrid';
import { getSection } from '@/lib/content-api';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { fallbackPublications, fallbackSettings } from '@/lib/fallback-content';
import { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS, newsCategoryOf, type NewsCategory } from '@/types';

const BASE = '/news-and-events';

const DESCRIPTIONS: Record<NewsCategory | 'all', string> = {
  all: 'News, events and newsletters from the African Centre for Law and Public Interest Technology.',
  news: 'The latest news, research and commentary from the Centre.',
  events: 'Convenings, workshops, trainings and dialogues hosted by or featuring the Centre.',
  newsletter: 'Our newsletters, bringing together the Centre’s work and developments in law and technology across Africa.',
};

const EMPTY: Record<NewsCategory | 'all', string> = {
  all: 'Nothing has been posted yet.',
  news: 'No news has been posted yet.',
  events: 'No events have been posted yet.',
  newsletter: 'No newsletters have been posted yet.',
};

/**
 * The News & Events listing — every entry, or only one category's
 * (`/news-and-events/news`, `/events`, `/newsletter`).
 */
export default async function NewsEventsPage({ category }: { category?: NewsCategory }) {
  // Switched off from the dashboard → the pages don't exist for visitors.
  // Editors previewing from the admin still see them, so the content can be
  // checked before the section is switched on.
  const [settings, { isEnabled: isPreview }] = await Promise.all([
    getSection('settings', fallbackSettings),
    draftMode(),
  ]);
  if (!settings.publicationsEnabled && !isPreview) notFound();

  const all = await getSection('publications', fallbackPublications);
  // The API already drops disabled items from the published copy, but a draft
  // preview reads the editor's working copy whole — filter here too so the
  // preview shows exactly what publishing would.
  const items = all
    .filter((p) => p.enabled !== false)
    .filter((p) => !category || newsCategoryOf(p) === category)
    .sort((a, b) => a.order - b.order);

  const key = category ?? 'all';
  const heading = category ? NEWS_CATEGORY_LABELS[category] : 'News & Events';
  const tabs = [
    { label: 'All', href: BASE, active: !category },
    ...NEWS_CATEGORIES.map((c) => ({ label: NEWS_CATEGORY_LABELS[c], href: `${BASE}/${c}`, active: c === category })),
  ];

  return (
    <>
      <PageBanner
        breadcrumb={category ? `News & Events / ${heading}` : 'News & Events'}
        title={heading}
        description={DESCRIPTIONS[key]}
      />

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <nav aria-label="News & Events categories" className="flex flex-wrap gap-2 mb-10">
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                aria-current={t.active ? 'page' : undefined}
                className={`px-5 py-2 rounded-full border border-wine text-[0.95rem] font-bold transition-colors ${
                  t.active ? 'bg-wine text-white' : 'text-wine hover:bg-wine hover:text-white'
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>

          {items.length > 0 ? (
            <PublicationsGrid items={items} />
          ) : (
            <p className="lead-lg text-center">{EMPTY[key]}</p>
          )}

          <div className="text-center mt-14 reveal">
            <p className="lead-lg mx-auto" style={{ maxWidth: 680 }}>
              Subscribe to our updates to be notified when we post news, announce events or release a new newsletter.
            </p>
            <Link className="btn btn-wine mt-2" href="/#contact">Get Notified</Link>
          </div>
        </div>
      </section>

      <ContactCta
        title="Want to know more about our work?"
        description="We welcome enquiries about our research, events and collaboration."
      />
    </>
  );
}
