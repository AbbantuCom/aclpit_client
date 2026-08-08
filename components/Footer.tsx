import Link from 'next/link';
import Img from './Img';
import CookiePreferencesLink from './CookiePreferencesLink';

const practiceAreaLinks = [
  { label: 'Data Protection and Privacy', href: '/practice-areas#data' },
  { label: 'AI and Accountability', href: '/practice-areas#ai' },
  { label: 'Digital Justice', href: '/practice-areas#justice' },
  { label: 'Fintech, Competition, and Consumer Protections', href: '/practice-areas#fintech' },
  { label: 'Blockchain and Registries', href: '/practice-areas#blockchain' },
  { label: 'Digital Rights', href: '/practice-areas#rights' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr_1.5fr] gap-10 pb-12 border-b-2 border-white/10">
          <div className="footer-brand sm:col-span-2 lg:col-span-1">
            <Img src="/assets/logo-icon-white.png" alt="ACLPIT logo" />
            <p><strong>African Centre for Law and Public Interest Technology</strong></p>
            <p>An independent, Africa rooted centre shaping the legal, regulatory and policy environment for technology in the public interest.</p>
            <div className="social-links mt-4">
              <a href="https://www.linkedin.com/company/african-centre-for-law-and-public-interest-technology/about/" target="_blank" rel="noopener" aria-label="LinkedIn"><i className="bi bi-linkedin" /></a>
              <a href="#" aria-label="X"><i className="bi bi-twitter-x" /></a>
              <a href="https://www.youtube.com/@LegalTechDialogues" target="_blank" rel="noopener" aria-label="YouTube"><i className="bi bi-youtube" /></a>
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook" /></a>
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
              <li><i className="bi bi-envelope me-2" /><a href="mailto:info@aclpit.org">info@aclpit.org</a></li>
              <li><i className="bi bi-telephone me-2" /><a href="tel:+256414671838">+256 414 671 838</a></li>
              <li><i className="bi bi-geo-alt me-2" />Plot 1 Lourdel Road, Lourdel Towers, 5th Floor</li>
              <li><i className="bi bi-mailbox me-2" />P.O. Box 133174, Kampala–Uganda</li>
              <li><i className="bi bi-clock me-2" />Mon to Fri, 8:30 am to 5:30 pm</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom flex flex-wrap justify-between items-center">
          <span>&copy; {new Date().getFullYear()} African Centre for Law and Public Interest Technology. All rights reserved.</span>
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
