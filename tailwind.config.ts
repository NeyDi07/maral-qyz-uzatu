import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        'lavender-soft': 'var(--lavender-soft)',
        lavender: 'var(--lavender)',
        plum: 'var(--plum)',
        gold: 'var(--gold)',
        maroon: 'var(--maroon)',
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
