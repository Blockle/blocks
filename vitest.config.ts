import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    workspace: ['packages/*'],
    include: ['**/*.test.{ts,tsx}'],
    setupFiles: [
      resolve(__dirname, './setupTests.ts'),
      resolve(__dirname, './setupTests.storybook.ts'),
    ],
    css: true,
  },
});
