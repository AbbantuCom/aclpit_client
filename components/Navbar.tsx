'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Img from './Img';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'Services', href: '/services' },
  // Publications and Legal Tech Dialogues are built and live at /publications
  // and /dialogues, but stay out of the nav — mirrors the commented-out links
  // in every _legacy page while those sections are not yet ready to announce.
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
  }, [pathname]);

  return (
    <nav
      aria-label="Main navigation"
      className={`sticky top-0 z-50 bg-ivory border-b border-wine transition-[box-shadow,padding] duration-300 ${
        scrolled ? 'shadow-[0_10px_30px_rgba(64,8,42,0.12)] py-2' : 'py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between lg:flex-nowrap flex-wrap">
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
          className={`${open ? 'flex' : 'hidden'} lg:flex w-full lg:w-auto flex-col lg:flex-row lg:items-center gap-1 lg:gap-2 mt-3 lg:mt-0 lg:ms-auto lg:flex-nowrap`}
        >
          {navItems.map((item) => {
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
