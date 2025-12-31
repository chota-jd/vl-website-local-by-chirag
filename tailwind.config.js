/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        accent: {
          DEFAULT: '#0064E0',
          50: '#EBF4FF',
          100: '#D1E4FF',
          200: '#A3C9FF',
          300: '#75AFFF',
          400: '#4794FF',
          500: '#0064E0',
          600: '#0050B3',
          700: '#003C86',
          800: '#002859',
          900: '#00142C',
        },
        bronze: '#8E795E',
        platinum: '#4B5563',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-manrope)', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      letterSpacing: {
        'ultra': '0.35em',
      },
      animation: {
        'slow-pan': 'slowPan 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        slowPan: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

