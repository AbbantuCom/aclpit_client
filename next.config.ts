import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Vanity shortcut to the hosting provider's webmail. Temporary (307) so the
      // browser re-asks each time and the target can move without stale caches.
      // The team now lives on the About page.
      { source: '/team', destination: '/about#our-team', permanent: true },
      // Publications became News & Events; keep old links working.
      { source: '/publications', destination: '/news-and-events', permanent: true },
      { source: '/webmail', destination: 'https://server86.web-hosting.com:2096', permanent: false },
    ];
  },
};

export default nextConfig;
