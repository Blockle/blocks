/* eslint-disable no-undef */
const autoprefixer = require('autoprefixer');

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [autoprefixer()],
};

module.exports = config;
