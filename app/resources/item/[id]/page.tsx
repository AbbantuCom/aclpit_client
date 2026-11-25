import type { Metadata } from 'next';
import Link from 'next/link';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import Img from '@/components/Img';
import ContactCta from '@/components/ContactCta';
import ShareButtons from '@/components/ShareButtons';
import ViewPdfButton from '@/components/ViewPdfButton';
import { getSection } from '@/lib/content-api';
import { fallbackPublications, fallbackSettings } from '@/lib/fallback-content';
import { resourceItemPath, shareSentence, SITE_URL } from '@/lib/resources';
import { NEWS_CATEGORY_LABELS, newsCategoryOf, sharePlatformsOf, type PublicationItem } from '@/types';

export const revalidate = 3600;

const SITE = 'African Centre for Law and Public Interest Technology';

// Rendered on demand, like the team bio pages: the content fetch underneath is
// cached and tag-revalidated, and a newly added item works straight away.

/** The entry, if visitors may see it: Resources switched on (or previewing) and the item enabled. */
async function findItem(id: string): Promise<PublicationItem | undefined> {
  const [settings, { isEnabled: isPreview }] = await Promise.all([
    getSection('settings', fallbackSettings),
    draftMode(),
  ]);
  if (!settings.publicationsEnabled && !isPreview) return undefined;
  const items = await getSection('publications', fallbackPublications);
  return items.find((p) => p.id === id && p.enabled !== false);
}

function formatDate(iso: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** What social media shows when this page is shared: title, summary and cover image. */
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const item = await findItem(decodeURIComponent(id));
  if (!item) return { title: `Resources | ${SITE}` };

  // A short summary for the preview card: the first ~200 characters, cut at a word.
  const full = item.description.replace(/\s+/g, ' ').trim();
  const description = !full
    ? shareSentence(item)
    : full.length <= 200
      ? full
      : `${full.slice(0, 200).replace(/\s+\S*$/, '')}…`;
  // The cover, or else the site logo — a preview card with no picture is easy to scroll past.
  const images = item.coverImage
    ? [{ url: item.coverImage, alt: item.title }]
    : SITE_URL
      ? [{ url: '/assets/logo-lockup.png', width: 509, height: 457, alt: 'ACLPIT logo' }]
      : undefined;
  return {
    title: `${item.title} | ${SITE}`,
    description,
    ...(SITE_URL && { alternates: { canonical: resourceItemPath(item.id) } }),
    openGraph: {
      type: 'article',
      title: item.title,
      description,
      siteName: SITE,
      images,
      ...(SITE_URL && { url: resourceItemPath(item.id) }),
    },
    twitter: {
      card: item.coverImage ? 'summary_large_image' : 'summary',
      title: item.title,
      description,
      images: item.coverImage ? [item.coverImage] : undefined,
    },
  };
}

export default async function ResourceItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await findItem(decodeURIComponent(id));
  if (!item) notFound();

  const settings = await getSection('settings', fallbackSettings);
  const sharePlatforms = settings.publicationSharingEnabled ? sharePlatformsOf(settings.publicationSharePlatforms) : [];
  const category = newsCategoryOf(item);
  const date = formatDate(item.date);

  return (
    <>
      <header className="page-banner">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <p className="breadcrumb-aclpit">
            <Link href="/">Home</Link> &nbsp;/&nbsp; <Link href="/resources">Resources</Link> &nbsp;/&nbsp;{' '}
            <Link href={`/resources/${category}`}>{NEWS_CATEGORY_LABELS[category]}</Link>
          </p>
          <h1 className="reveal visible">{item.title}</h1>
          <div className="arch-divider on-dark" aria-hidden="true"><span></span><span></span></div>
        </div>
      </header>

      <section className="section">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {item.coverImage && (
              <div className="lg:col-span-4 reveal">
                <div className="card-aclpit">
                  <div className="placeholder-media pdf-cover !h-auto aspect-[3/4]" role="img" aria-label={`${item.title} cover`}>
                    <Img src={item.coverImage} alt="" />
                  </div>
                </div>
              </div>
            )}

            <div className={`${item.coverImage ? 'lg:col-span-8' : 'lg:col-span-12'} reveal reveal-delay-1`}>
              <div className="pub-meta">
                <span>{item.category || NEWS_CATEGORY_LABELS[category]}</span>
                {date && (
                  <>
                    <span className="dot" />
                    <span>{date}</span>
                  </>
                )}
              </div>
              {item.description
                .split(/\n{2,}/)
                .filter(Boolean)
                .map((paragraph, i) => (
                  <p key={i} className={i === 0 ? 'lead-lg mt-3' : ''}>{paragraph}</p>
                ))}

              {item.fileUrl && (
                <div className="mt-6">
                  <ViewPdfButton url={item.fileUrl} title={item.title} />
                </div>
              )}

              {sharePlatforms.length > 0 && (
                <div className="mt-10">
                  <span className="eyebrow">Share</span>
                  <ShareButtons
                    path={resourceItemPath(item.id)}
                    title={item.title}
                    sentence={shareSentence(item)}
                    platforms={sharePlatforms}
                    className="mt-3"
                  />
                </div>
              )}

              <div className="mt-10">
                <Link className="btn btn-outline-wine" href="/resources">← Back to Publications</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCta
        title="Looking for research on a specific question?"
        description="We welcome enquiries about our research agenda, commissioned studies, events and collaboration."
      />
    </>
  );
}
