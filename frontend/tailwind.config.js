module.exports = {
  mode: 'jit',

  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],

  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-rtl'),
    require('daisyui'),
    require('tailwindcss-flip'),
  ],

  theme: {
    container: {
      center: true,
    },

    extend: {},

    container: {
      center: true,
      padding: '2rem',
    },

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      sans: [
        'Sora',
        'Roboto',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],

      serif: ['Roboto', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
  },

  variants: {
    extend: {},
  },

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    darkTheme: 'dark',
  },
};
