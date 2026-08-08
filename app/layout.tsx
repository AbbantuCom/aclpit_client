import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'African Centre for Law and Public Interest Technology | Law, Technology and the Public Interest in Africa',
  description:
    'The African Centre for Law and Public Interest Technology (ACLPIT) researches, litigates, advises and convenes on the legal and regulatory dimensions of technology in Africa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
