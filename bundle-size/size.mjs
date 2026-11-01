import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { parseArgs } from 'node:util';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { build } from 'vite';

import { formatTable } from './table.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const scenarios = ['baseline', 'button', 'everything'];

// Peer deps a consumer already has: not part of what Blocks costs.
const external = [/^react(\/.*)?$/, /^react-dom(\/.*)?$/];

function measure(files) {
  const bytes = Buffer.concat(files);

  return {
    minified: bytes.length,
    gzipped: gzipSync(bytes).length,
  };
}

async function buildScenario(name) {
  const outDir = join(root, 'dist', name);

  await rm(outDir, { recursive: true, force: true });

  await build({
    root,
    configFile: false,
    logLevel: 'warn',
    publicDir: false,
    plugins: [react(), vanillaExtractPlugin()],
    build: {
      outDir,
      emptyOutDir: true,
      minify: true,
      cssMinify: true,
      cssCodeSplit: false,
      lib: {
        entry: join(root, 'scenarios', `${name}.js`),
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: { external },
    },
  });

  const assets = (await readdir(outDir, { recursive: true })).map((file) =>
    join(outDir, file),
  );
  const read = (extension) =>
    Promise.all(
      assets.filter((file) => file.endsWith(extension)).map((f) => readFile(f)),
    );

  return {
    js: measure(await read('.js')),
    css: measure(await read('.css')),
  };
}

const { values } = parseArgs({
  options: { json: { type: 'string' } },
});

const results = {};

for (const name of scenarios) {
  results[name] = await buildScenario(name);
}

console.log(formatTable(results));

if (values.json) {
  const file = resolve(values.json);

  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(results, null, 2)}\n`);
  console.log(`\nWrote ${file}`);
}
