import type { Metadata } from 'next';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import PreviewBanner from '@/components/PreviewBanner';
import RevealObserver from '@/components/RevealObserver';
import QueryProvider from '@/components/QueryProvider';
import { getSection } from '@/lib/content-api';
import { fallbackAbout, fallbackPublications, fallbackSettings } from '@/lib/fallback-content';
import { NEWS_CATEGORIES, NEWS_CATEGORY_LABELS, newsCategoryOf } from '@/types';
import { SITE_URL } from '@/lib/resources';

const SITE_DESCRIPTION =
  'The African Centre for Law and Public Interest Technology (ACLPIT) researches, litigates, advises and convenes on the legal and regulatory dimensions of technology in Africa.';

export const metadata: Metadata = {
  title: 'African Centre for Law and Public Interest Technology | Law, Technology and the Public Interest in Africa',
  description: SITE_DESCRIPTION,
  // With the site's public address configured, link previews on social media
  // (WhatsApp, Facebook, LinkedIn, X…) get absolute links and the logo as a
  // fallback picture for any page that has no image of its own. Without it,
  // relative links would resolve to localhost, so those details are left out.
  ...(SITE_URL && {
    metadataBase: new URL(SITE_URL),
    openGraph: {
      type: 'website',
      siteName: 'African Centre for Law and Public Interest Technology',
      title: 'African Centre for Law and Public Interest Technology',
      description: SITE_DESCRIPTION,
      images: [{ url: '/assets/logo-lockup.png', width: 509, height: 457, alt: 'ACLPIT logo' }],
    },
  }),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, resources, about] = await Promise.all([
    getSection('settings', fallbackSettings),
    getSection('publications', fallbackPublications),
    getSection('about', fallbackAbout),
  ]);
  // Only categories with something live get a menu entry.
  const live = resources.filter((p) => p.enabled !== false);
  const resourceCategories = NEWS_CATEGORIES.filter((c) => live.some((p) => newsCategoryOf(p) === c)).map((c) => ({
    key: c,
    label: NEWS_CATEGORY_LABELS[c],
  }));

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar
            showDialogues={settings.dialoguesEnabled === true}
            showPublications={settings.publicationsEnabled === true}
            resourceCategories={resourceCategories}
            companyProfileUrl={about.companyProfileUrl ?? ''}
          />
          {children}
          <Footer />
          <CookieBanner />
          <PreviewBanner />
          <RevealObserver />
        </QueryProvider>
      </body>
    </html>
  );
}
