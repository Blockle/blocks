import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

import { resolve } from 'node:path';

export const sharedConfig = defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    // Browser tests run in their own project, see vitest.browser.config.ts
    exclude: [...configDefaults.exclude, '**/*.browser.test.{ts,tsx}'],
    setupFiles: [resolve(__dirname, './setupTests.ts')],
    css: false,
  },
});
