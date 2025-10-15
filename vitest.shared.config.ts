import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export const sharedConfig = defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.{ts,tsx}'],
    setupFiles: [
      resolve(__dirname, './setupTests.ts'),
    ],
    css: false,
  },
});
