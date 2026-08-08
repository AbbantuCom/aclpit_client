import Link from 'next/link';
import Img from './Img';
import CookiePreferencesLink from './CookiePreferencesLink';
import { getSection } from '@/lib/content-api';
import { fallbackFooter, fallbackContact } from '@/lib/fallback-content';

export const revalidate = 3600;

const practiceAreaLinks = [
  { label: 'Data Protection and Privacy', href: '/practice-areas#data' },
  { label: 'AI and Accountability', href: '/practice-areas#ai' },
  { label: 'Digital Justice', href: '/practice-areas#justice' },
  { label: 'Fintech, Competition, and Consumer Protections', href: '/practice-areas#fintech' },
  { label: 'Blockchain and Registries', href: '/practice-areas#blockchain' },
  { label: 'Digital Rights', href: '/practice-areas#rights' },
];

export default async function Footer() {
  const [footer, contact] = await Promise.all([
    getSection('footer', fallbackFooter),
    getSection('contact', fallbackContact),
  ]);

  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-10 pb-12 border-b-2 border-white/10">
          <div className="footer-brand sm:col-span-2 lg:col-span-1">
            <Img src="/assets/logo-icon-white.png" alt="ACLPIT logo" />
            <p><strong>{footer.copyrightName}</strong></p>
            <p>{footer.description}</p>
            <div className="social-links mt-4">
              {contact.socials.linkedin && (
                <a href={contact.socials.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
              )}
              <a href={contact.socials.twitter || '#'} aria-label="X"><i className="bi bi-twitter-x" /></a>
              {contact.socials.youtube && (
                <a href={contact.socials.youtube} target="_blank" rel="noopener" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              )}
              <a href={contact.socials.facebook || '#'} aria-label="Facebook"><i className="bi bi-facebook" /></a>
            </div>
          </div>
          <div>
            <h4>Navigate</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/practice-areas">Practice Areas</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Practice Areas</h4>
            <ul>
              {practiceAreaLinks.map((l) => (
                <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><i className="bi bi-envelope me-2" /><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><i className="bi bi-telephone me-2" /><a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>{contact.phone}</a></li>
              <li><i className="bi bi-geo-alt me-2" />{contact.address}</li>
              <li><i className="bi bi-mailbox me-2" />{contact.postalAddress}</li>
              <li><i className="bi bi-clock me-2" />{contact.officeHours}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom flex flex-wrap justify-between items-center">
          <span>&copy; {new Date().getFullYear()} {footer.copyrightName}. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <CookiePreferencesLink />
          </span>
        </div>
      </div>
    </footer>
  );
}
