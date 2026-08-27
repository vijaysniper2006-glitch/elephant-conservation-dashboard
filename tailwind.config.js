/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          200: '#c5e4cd',
          300: '#99cfab',
          400: '#64b281',
          500: '#409660',
          600: '#2f794c',
          700: '#26603e',
          800: '#224d34',
          900: '#1d402c',
          950: '#0b2316',
        },
        safari: {
          50: '#fdf9ee',
          100: '#f9f1d4',
          200: '#f2e0a7',
          300: '#e9ca72',
          400: '#dfb043',
          500: '#d1972a',
          600: '#b67721',
          700: '#90551c',
          800: '#75441d',
          900: '#63391d',
        },
        alert: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#eab308',
          low: '#3b82f6',
          safe: '#22c55e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
