/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#1A1A1A',
          surface: '#161616',
          deep: '#111111',
        },
        border: {
          subtle: '#1E1E1E',
          mid: '#2A2A2A',
        },
        accent: {
          green: '#4ADE80',
          'green-dark': '#22C55E',
          'green-muted': '#1E3A1E',
        },
        text: {
          primary: '#E2E8F0',
          secondary: '#888888',
          muted: '#555555',
          ghost: '#333333',
        },
        red: {
          neg: '#ef4444',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        none: '0',
        card: '12px',
      },
    },
  },
  plugins: [],
};
