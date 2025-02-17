import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export default defineConfig({
  build: {
    minify: false,
    ssr: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        reset: 'src/entries/reset.ts',
        'themes/momotaro': 'src/entries/themes/momotaro.ts',
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        globals: {
          react: 'React',
        },
      },
    },
  },
  plugins: [
    externalizeDeps({
      peerDeps: true,
      deps: true,
      devDeps: true,
    }),
    preserveDirectives(),
    react(),
    vanillaExtractPlugin({
      unstable_mode: 'transform',
    }),
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],
});
