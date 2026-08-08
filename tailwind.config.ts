import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wine:      'var(--color-wine)',
        'wine-deep': 'var(--color-wine-deep)',
        'wine-soft': 'var(--color-wine-soft)',
        ivory:     'var(--color-ivory)',
        sand:      'var(--color-sand)',
        stone:     'var(--color-stone)',
        ink:       'var(--color-ink)',
        muted:     'var(--color-muted)',
      },
      fontFamily: {
        body: ['var(--font-body)'],
      },
      borderRadius: {
        arch: 'var(--radius-arch)',
        card: 'var(--radius-card)',
      },
      boxShadow: {
        brand: 'var(--shadow-brand)',
      },
    },
  },
  plugins: [],
};

export default config;
