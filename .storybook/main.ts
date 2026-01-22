import { defineMain } from '@storybook/react-vite/node';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { mergeConfig } from 'vite';

export default defineMain({
  framework: '@storybook/react-vite',
  stories: [
    '../packages/**/*.mdx',
    '../packages/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  async viteFinal(config) {
    return mergeConfig(config, {
      base: './',
      plugins: [vanillaExtractPlugin()],
    });
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: ['./public'],
  core: {
    disableWhatsNewNotifications: true,
  },
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
});
