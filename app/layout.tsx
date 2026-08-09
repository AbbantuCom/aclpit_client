import type { Metadata } from 'next';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import PreviewBanner from '@/components/PreviewBanner';
import RevealObserver from '@/components/RevealObserver';
import QueryProvider from '@/components/QueryProvider';

export const metadata: Metadata = {
  title: 'African Centre for Law and Public Interest Technology | Law, Technology and the Public Interest in Africa',
  description:
    'The African Centre for Law and Public Interest Technology (ACLPIT) researches, litigates, advises and convenes on the legal and regulatory dimensions of technology in Africa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
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
