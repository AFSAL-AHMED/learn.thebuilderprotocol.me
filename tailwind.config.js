/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#05070B',
          50: '#0A0E18',
          100: '#0D1120',
          200: '#111827',
          300: '#1a2035',
          400: '#243050',
        },
        cyan: {
          neon: '#00F0FF',
          dim: '#00B8CC',
          glow: 'rgba(0, 240, 255, 0.15)',
        },
        amethyst: {
          DEFAULT: '#9D4EDD',
          dim: '#7B3DB0',
          glow: 'rgba(157, 78, 221, 0.15)',
        },
        slate: {
          muted: '#8B9EC7',
          border: 'rgba(255,255,255,0.05)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,240,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(157,78,221,0.10) 0%, transparent 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 240, 255, 0.2), 0 0 60px rgba(0, 240, 255, 0.08)',
        'amethyst-glow': '0 0 20px rgba(157, 78, 221, 0.25), 0 0 60px rgba(157, 78, 221, 0.08)',
        'card': '0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.10), 0 8px 40px rgba(0,0,0,0.6)',
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'flicker': 'flicker 4s linear infinite',
        'scan-line': 'scanLine 8s linear infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        flicker: {
          '0%, 98%, 100%': { opacity: '1' },
          '99%': { opacity: '0.8' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200vh)' },
        },
      },
    },
  },
  plugins: [],
}
