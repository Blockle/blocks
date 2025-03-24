import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import preserveDirectives from 'rollup-preserve-directives';
import { type LibraryOptions, type UserConfig, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

export function createConfig(entry?: LibraryOptions['entry']): UserConfig {
  return defineConfig({
    build: {
      minify: false,
      ssr: true,
      outDir: './dist',
      lib: {
        entry: entry ?? 'src/index.ts',
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
        include: ['./src/**/*.{ts,tsx}'],
        // outDir: './dist',
        // root: 'src',
        // entryRoot: '/Users/niek/Projects/blockle/blocks/packages/css/src',
      }),
    ],
    publicDir: false,
  });
}

// Default export is needed for storybook, see .storybook/main.ts
export default createConfig();
