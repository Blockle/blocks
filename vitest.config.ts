import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'vitest/config';

import { resolve } from 'node:path';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    globals: true,
    environment: 'jsdom',
    projects: ['packages/*'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      exclude: ['**/dist/**', './*', './.storybook/**', '**/*.stories.tsx'],
    },
    setupFiles: [resolve(__dirname, './setupTests.ts')],
    css: false,
  },
});
