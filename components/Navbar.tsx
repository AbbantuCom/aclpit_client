'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Img from './Img';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'What We Do', href: '/services' },
  { label: 'Our Team', href: '/team' },
  // Legal Tech Dialogues and News & Events are switched on and off from the
  // admin dashboard — see `showDialogues` / `showPublications` below.
];

const dialoguesItem = { label: 'Dialogues', href: '/dialogues' };

const NEWS_BASE = '/news-and-events';
const newsLinks = [
  { label: 'News', href: `${NEWS_BASE}/news` },
  { label: 'Events', href: `${NEWS_BASE}/events` },
  { label: 'Newsletter', href: `${NEWS_BASE}/newsletter` },
];

export default function Navbar({
  showDialogues = false,
  showPublications = false,
}: {
  showDialogues?: boolean;
  showPublications?: boolean;
}) {
  const pathname = usePathname();
  const items = [
    ...navItems,
    ...(showDialogues ? [dialoguesItem] : []),
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const newsRef = useRef<HTMLDivElement>(null);
  const newsActive = pathname.startsWith(NEWS_BASE);

  // Close the News & Events menu on a click elsewhere or on Escape.
  useEffect(() => {
    if (!newsOpen) return;
    function onPointer(e: PointerEvent) {
      if (newsRef.current && !newsRef.current.contains(e.target as Node)) setNewsOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setNewsOpen(false);
    }
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [newsOpen]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setNewsOpen(false);
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 bg-ivory border-b border-wine transition-[box-shadow,padding] duration-300 ${
        scrolled ? 'shadow-[0_10px_30px_rgba(64,8,42,0.12)] py-2' : 'py-3.5'
      }`}
    >
      <div className="w-full px-6 lg:px-16 flex items-center justify-between lg:flex-nowrap flex-wrap">
        <Link href="/" className="flex items-center gap-3.5 shrink-0">
          <Img src="/assets/logo-icon.png" alt="ACLPIT logo" className="h-[52px] w-auto" />
          <span className="leading-tight">
            <span className="block font-bold text-[1.05rem] tracking-[0.16em] text-wine">ACLPIT</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="lg:hidden border border-wine rounded-[10px] p-2 shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 30 30" aria-hidden="true">
            <path stroke="#5E0E3A" strokeLinecap="round" strokeWidth="3" d="M4 7h22M4 15h22M4 23h22" />
          </svg>
        </button>

        <div
          id="mainNav"
          className={`${open ? 'flex' : 'hidden'} lg:flex w-full lg:w-auto flex-col lg:flex-row lg:items-center gap-1 lg:gap-5 mt-3 lg:mt-0 lg:ms-auto lg:flex-nowrap`}
        >
          {items.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full lg:w-auto py-2.5 lg:py-2.5 px-0 lg:px-3.5 text-[1rem] font-bold border-b lg:border-b-2 ${
                  active ? 'text-wine border-wine' : 'text-ink border-transparent hover:text-wine'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {showPublications && (
            <div
              ref={newsRef}
              className="relative w-full lg:w-auto"
              onMouseEnter={() => window.matchMedia('(min-width: 1024px)').matches && setNewsOpen(true)}
              onMouseLeave={() => window.matchMedia('(min-width: 1024px)').matches && setNewsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setNewsOpen((o) => !o)}
                aria-expanded={newsOpen}
                aria-controls="newsMenu"
                className={`w-full lg:w-auto flex items-center justify-between lg:justify-start gap-1.5 py-2.5 px-0 lg:px-3.5 text-[1rem] font-bold border-b lg:border-b-2 ${
                  newsActive ? 'text-wine border-wine' : 'text-ink border-transparent hover:text-wine'
                }`}
              >
                News &amp; Events
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={`transition-transform ${newsOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id="newsMenu"
                className={`${newsOpen ? 'block' : 'hidden'} lg:absolute lg:left-0 lg:top-full lg:pt-2 lg:min-w-[200px] z-50`}
              >
                <ul className="lg:bg-ivory lg:border lg:border-wine lg:rounded-[10px] lg:shadow-[0_10px_30px_rgba(64,8,42,0.12)] lg:py-2 ps-4 lg:ps-0">
                  {newsLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? 'page' : undefined}
                          className={`block py-2 lg:px-4 text-[0.98rem] font-bold ${
                            active ? 'text-wine' : 'text-ink hover:text-wine lg:hover:bg-wine/5'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          <Link
            href="/#contact"
            className="btn btn-wine mt-2 lg:mt-0 lg:ms-3 text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}
