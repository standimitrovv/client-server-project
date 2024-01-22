import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'open-menu': {
          '0%': {
            transform: 'scaleY(0)',
          },
          '80%': {
            transform: 'scaleY(1.2)',
          },
          '100%': {
            transform: 'scaleY(1)',
          },
        },
        cursor: {
          '50%': {
            borderColor: 'transparent',
          },
        },
        typing: {
          from: {
            width: '0',
          },
        },
      },
      animation: {
        'open-menu': 'open-menu 0.5s ease-in-out forwards',
        'typing-cursor':
          'typing 2s steps(17), cursor .4s step-end infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;
