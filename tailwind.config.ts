import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        muted: '#F1F5F9',
        fnk: {
          DEFAULT: '#0EA5E9',
          glow: '#0EA5E940',
          dim: '#0284C7',
        },
        volt: {
          DEFAULT: '#0F172A',
          dim: '#1E293B',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 6s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px #0EA5E940' },
          '50%': { boxShadow: '0 0 60px #0EA5E980, 0 0 120px #0EA5E920' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100vh' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #60A5FA 100%)',
        'gradient-dark': 'linear-gradient(180deg, #F8FAFC 0%, #E2E8F0 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFFFFF 0%, #F1F5F9 100%)',
        'gradient-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, #0EA5E925 0%, transparent 100%)',
      },
      boxShadow: {
        'fnk-glow': '0 0 40px #0EA5E940',
        'fnk-glow-lg': '0 0 60px #0EA5E960, 0 0 120px #0EA5E920',
        'volt-glow': '0 0 40px #0F172A40',
      },
      maxWidth: {
        container: '1400px',
      },
      screens: {
        wide: '1440px',
      },
    },
  },
  plugins: [],
}

export default config
