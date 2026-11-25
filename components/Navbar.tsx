'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Img from './Img';

interface NavLink {
  label: string;
  href: string;
}

interface NavMenu {
  label: string;
  /** Where the menu's own label goes when clicked; without one it only opens the menu. */
  href?: string;
  /** Path prefixes that mark this menu as the current section. */
  activePaths: string[];
  links: NavLink[];
}

type NavItem = NavLink | NavMenu;

const homeItem: NavLink = { label: 'Home', href: '/' };

const aboutMenu: NavMenu = {
  label: 'About Us',
  href: '/about',
  // Team biographies (/team/:id) belong to the About section too.
  activePaths: ['/about', '/team'],
  links: [
    { label: 'Who We Are', href: '/about#who-we-are' },
    { label: 'Our Team', href: '/about#our-team' },
  ],
};

const fixedItems: NavLink[] = [
  { label: 'Practice Areas', href: '/practice-areas' },
  { label: 'What We Do', href: '/services' },
  // Legal Tech Dialogues and News & Events are switched on and off from the
  // admin dashboard — see `showDialogues` / `showPublications` below.
];

const dialoguesItem: NavLink = { label: 'Dialogues', href: '/dialogues' };

const NEWS_BASE = '/news-and-events';
const newsMenu: NavMenu = {
  label: 'News & Events',
  activePaths: [NEWS_BASE],
  links: [
    { label: 'News', href: `${NEWS_BASE}/news` },
    { label: 'Events', href: `${NEWS_BASE}/events` },
    { label: 'Newsletter', href: `${NEWS_BASE}/newsletter` },
  ],
};

const itemClass = (active: boolean) =>
  `py-2.5 px-0 lg:px-3.5 text-[1rem] font-bold border-b lg:border-b-2 ${
    active ? 'text-wine border-wine' : 'text-ink border-transparent hover:text-wine'
  }`;

const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * A main-menu entry with a submenu: opens on hover on desktop and on click/tap
 * everywhere. When the menu has its own `href`, the label is a link and the
 * chevron beside it opens the submenu.
 */
function NavDropdown({
  menu,
  pathname,
  onNavigate,
}: {
  menu: NavMenu;
  pathname: string;
  /** Called when one of the links is followed, so the mobile menu can close. */
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = `menu-${menu.label.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  const active = menu.activePaths.some((p) => pathname.startsWith(p));

  // Close on a click elsewhere or on Escape.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Links like /about#our-team don't change the pathname when followed from
  // /about itself, so close explicitly rather than waiting for a route change.
  function follow() {
    setOpen(false);
    onNavigate();
  }

  return (
    <div
      ref={ref}
      className="relative w-full lg:w-auto"
      onMouseEnter={() => isDesktop() && setOpen(true)}
      onMouseLeave={() => isDesktop() && setOpen(false)}
    >
      {menu.href ? (
        <div className={`flex items-center justify-between lg:justify-start ${itemClass(active)} lg:!pe-2`}>
          <Link href={menu.href} onClick={follow} className="flex-1 lg:flex-none">
            {menu.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={`Show ${menu.label} menu`}
            className="p-1.5 lg:ms-1"
          >
            <Chevron open={open} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={menuId}
          className={`w-full lg:w-auto flex items-center justify-between lg:justify-start gap-1.5 ${itemClass(active)}`}
        >
          {menu.label}
          <Chevron open={open} />
        </button>
      )}
      <div id={menuId} className={`${open ? 'block' : 'hidden'} lg:absolute lg:left-0 lg:top-full lg:pt-2 lg:min-w-[200px] z-50`}>
        <ul className="lg:bg-ivory lg:border lg:border-wine lg:rounded-[10px] lg:shadow-[0_10px_30px_rgba(64,8,42,0.12)] lg:py-2 ps-4 lg:ps-0">
          {menu.links.map((link) => {
            const current = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={follow}
                  aria-current={current ? 'page' : undefined}
                  className={`block py-2 lg:px-4 text-[0.98rem] font-bold ${
                    current ? 'text-wine' : 'text-ink hover:text-wine lg:hover:bg-wine/5'
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
  );
}

export default function Navbar({
  showDialogues = false,
  showPublications = false,
}: {
  showDialogues?: boolean;
  showPublications?: boolean;
}) {
  const pathname = usePathname();
  const items: NavItem[] = [
    homeItem,
    aboutMenu,
    ...fixedItems,
    ...(showDialogues ? [dialoguesItem] : []),
    ...(showPublications ? [newsMenu] : []),
  ];
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
            if ('links' in item) {
              return <NavDropdown key={item.label} menu={item} pathname={pathname} onNavigate={() => setOpen(false)} />;
            }
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`w-full lg:w-auto ${itemClass(active)}`}>
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
