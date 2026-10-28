import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineProject } from 'vitest/config';

import { resolve } from 'node:path';

// Resolve workspace packages to their sources, so vanilla-extract compiles
// their CSS and tests never depend on a prior build.
const alias = {
  '@blockle/blocks-core': resolve(__dirname, 'packages/core/src/index.ts'),
  '@blockle/blocks-react-slot': resolve(
    __dirname,
    'packages/slot/src/index.ts',
  ),
  '@blockle/blocks-react': resolve(__dirname, 'packages/react/src/index.ts'),
  '@blockle/blocks-theme-momotaro': resolve(
    __dirname,
    'packages/theme-momotaro/src/index.ts',
  ),
};

export default defineProject({
  plugins: [vanillaExtractPlugin()],
  resolve: { alias },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-dev-runtime',
      'vitest-browser-react',
    ],
  },
  test: {
    name: 'browser',
    globals: true,
    include: ['packages/**/*.browser.test.{ts,tsx}'],
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
