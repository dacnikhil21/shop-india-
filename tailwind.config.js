/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fk: {
          blue: '#2874F0',
          yellow: '#ffe500',
          darkBlue: '#1557D6',
          text: '#172337',
          gray: '#64748B',
          lightGray: '#F8FAFC',
          border: '#E5E7EB',
          orange: '#FF6B00',
          red: '#E53935'
        },
        quick: {
          green: '#16A34A',
          lightGreen: '#eefcf2',
          yellow: '#ffd600',
          dark: '#1c1c1c',
          gray: '#666666',
          border: '#e8e8e8'
        },
        services: {
          gold: '#b8924b',
          darkGold: '#99732e',
          bg: '#0f0f11',
          card: '#1c1c1e',
          text: '#f5f5f7',
          gray: '#a1a1a6',
          border: '#2c2c2e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        md3_1: '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        md3_2: '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30)',
        md3_3: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        fk: '0 1px 2px 0 rgba(23, 35, 55, 0.05), 0 2px 4px 0 rgba(23, 35, 55, 0.04)',
        fkHeader: '0 1px 1px 0 rgba(0,0,0,.16)',
        fkCardHover: '0 12px 24px -4px rgba(23, 35, 55, 0.08), 0 4px 12px -2px rgba(23, 35, 55, 0.04), 0 0 1px 0 rgba(23, 35, 55, 0.12)'
      },
      borderRadius: {
        'fk': '2px',
        'fk-card': '4px',
        'md3': '12px',
        'md3-lg': '16px'
      }
    },
  },
  plugins: [],
}


