/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ppc: {
          50: '#eef3ff',
          100: '#dce6ff',
          200: '#bfd0ff',
          300: '#95afff',
          400: '#6889ff',
          500: '#3d63ff',
          600: '#2c49e5',
          700: '#253bb8',
          800: '#233492',
          900: '#202f73',
          950: '#141b42',
        },
        paper: {
          50: '#f7f8f8',
          100: '#eff1f2',
          200: '#dfe3e5',
          300: '#c8ced1',
          400: '#9fa8ad',
          500: '#788287',
          600: '#5f696e',
          700: '#4d5559',
          800: '#343a3d',
          900: '#222629',
        },
        graphite: {
          50: '#f4f5f6',
          100: '#e4e6e8',
          200: '#c9cdd1',
          300: '#a3a9af',
          400: '#767e86',
          500: '#596169',
          600: '#454b52',
          700: '#363a40',
          800: '#25282d',
          900: '#17191d',
          950: '#0b0c0f',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(4.25rem, 10.4vw, 11rem)', { lineHeight: '0.78', letterSpacing: '-0.065em' }],
        'section': ['clamp(3rem, 6.8vw, 7.25rem)', { lineHeight: '0.88', letterSpacing: '-0.055em' }],
        'title': ['clamp(2rem, 4vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '-0.045em' }],
      },
      maxWidth: {
        page: '1680px',
        prose: '68ch',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '36': '9rem',
        '44': '11rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
