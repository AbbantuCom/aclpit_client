import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Vanity shortcut to the hosting provider's webmail. Temporary (307) so the
      // browser re-asks each time and the target can move without stale caches.
      // Practice Areas were renamed Programs.
      { source: '/practice-areas', destination: '/programs', permanent: true },
      // The team now lives on the About page.
      { source: '/team', destination: '/about#our-team', permanent: true },
      // Publications became News & Events, then Resources; keep old links working.
      { source: '/publications', destination: '/resources', permanent: true },
      { source: '/news-and-events', destination: '/resources', permanent: true },
      { source: '/news-and-events/:category', destination: '/resources/:category', permanent: true },
      { source: '/webmail', destination: 'https://server86.web-hosting.com:2096', permanent: false },
    ];
  },
};

export default nextConfig;
