/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#FBF8F1',
          200: '#F4EFE6',
          300: '#E8E1D5',
        },
        stone: {
          charcoal: '#1A1816',
          muted: '#68625B',
          border: 'rgba(26, 24, 22, 0.08)',
          'border-strong': 'rgba(26, 24, 22, 0.16)',
        },
        warm: {
          accent: '#0D6E6E',
          terracotta: '#C85A32',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
