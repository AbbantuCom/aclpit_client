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
import { newsCategoryOf } from '@/types';

export const metadata: Metadata = {
  title: 'African Centre for Law and Public Interest Technology | Law, Technology and the Public Interest in Africa',
  description:
    'The African Centre for Law and Public Interest Technology (ACLPIT) researches, litigates, advises and convenes on the legal and regulatory dimensions of technology in Africa.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, resources, about] = await Promise.all([
    getSection('settings', fallbackSettings),
    getSection('publications', fallbackPublications),
    getSection('about', fallbackAbout),
  ]);
  const hasResearch = resources.some((p) => p.enabled !== false && newsCategoryOf(p) === 'research');

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar
            showDialogues={settings.dialoguesEnabled === true}
            showPublications={settings.publicationsEnabled === true}
            hasResearch={hasResearch}
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
