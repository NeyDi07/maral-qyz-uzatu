import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: 'rgb(var(--cream-rgb) / <alpha-value>)',
        ivory: 'rgb(var(--ivory-rgb) / <alpha-value>)',
        'lavender-soft': 'rgb(var(--lavender-soft-rgb) / <alpha-value>)',
        lavender: 'rgb(var(--lavender-rgb) / <alpha-value>)',
        'lavender-deep': 'rgb(var(--lavender-deep-rgb) / <alpha-value>)',
        plum: 'rgb(var(--plum-rgb) / <alpha-value>)',
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        maroon: 'rgb(var(--maroon-rgb) / <alpha-value>)',
        ink: 'var(--ink)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 24px 80px rgba(74, 36, 79, 0.22)',
        soft: '0 18px 50px rgba(74, 36, 79, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
