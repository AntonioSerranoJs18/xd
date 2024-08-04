module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#131519',
        'custom-input': '#1a1c20',
        'custom-button': '#3ca46f',
        'custom-icon': '#ffffff',
      },
    },
  },
  plugins: [],
};