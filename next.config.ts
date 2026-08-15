import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Vanity shortcut to the hosting provider's webmail. Temporary (307) so the
      // browser re-asks each time and the target can move without stale caches.
      { source: '/webmail', destination: 'https://server86.web-hosting.com:2096', permanent: false },
    ];
  },
};

export default nextConfig;
