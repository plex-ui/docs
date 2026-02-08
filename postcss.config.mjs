import plexuiFunctions from './postcss/plexui-functions.mjs';

const config = {
  plugins: [
    '@tailwindcss/postcss',
    plexuiFunctions(),
  ],
};

export default config;
