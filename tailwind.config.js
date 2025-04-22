/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: '#fff1f1',
          100: '#ffe1e2',
          200: '#ffc7c9',
          300: '#ffa0a3',
          400: '#ff7a7f',
          500: '#ff5a5f', // Main primary
          600: '#e93d42',
          700: '#c32f33',
          800: '#a12a2e',
          900: '#862a2d',
        },
        // Secondary colors
        secondary: {
          50: '#eafbf8',
          100: '#d0f7f1',
          200: '#a3efe2',
          300: '#68e0d0',
          400: '#36ccb7',
          500: '#00c3a5', // Main secondary
          600: '#089b85',
          700: '#0c7c6b',
          800: '#0f6257',
          900: '#105249',
        },
        // Accent colors
        accent: {
          50: '#fffaeb',
          100: '#fff2c7',
          200: '#ffe989',
          300: '#ffdc58',
          400: '#ffd166', // Main accent
          500: '#fab317',
          600: '#dd8d0c',
          700: '#b86a10',
          800: '#985116',
          900: '#7f4419',
        },
        // Status colors
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
        // Neutral/gray tones
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
        'brutal-primary': '6px 6px 0px 0px rgba(255,90,95,1)',
        'brutal-secondary': '6px 6px 0px 0px rgba(0,195,165,1)',
        'brutal-accent': '6px 6px 0px 0px rgba(255,209,102,1)',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}