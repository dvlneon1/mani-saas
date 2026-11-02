/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../packages/design-system/tailwind.config.ts')],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
};
