import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { build } from 'vite';

import { formatTable } from './table.mjs';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { gzipSync } from 'node:zlib';

const root = dirname(fileURLToPath(import.meta.url));
const scenarios = ['baseline', 'button', 'everything'];

const packagesDir = join(root, '..', 'packages');

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

// Peer deps a consumer already has (react, @vanilla-extract/css, ...) are not
// part of what Blocks costs. Peers that are workspace packages are what is
// being measured, so they stay bundled.
async function findExternal() {
  const manifests = await Promise.all(
    (await readdir(packagesDir)).map(async (directory) =>
      JSON.parse(
        await readFile(join(packagesDir, directory, 'package.json'), 'utf8'),
      ),
    ),
  );
  const own = new Set(manifests.map((manifest) => manifest.name));
  const peers = new Set(
    manifests
      .flatMap((manifest) => Object.keys(manifest.peerDependencies ?? {}))
      .filter((peer) => !own.has(peer)),
  );

  return [...peers].map((peer) => new RegExp(`^${escapeRegExp(peer)}(/.*)?$`));
}

const external = await findExternal();

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
  const read = (extensions) =>
    Promise.all(
      assets
        .filter((file) => extensions.some((ext) => file.endsWith(ext)))
        .map((file) => readFile(file)),
    );

  return {
    js: measure(await read(['.js', '.mjs', '.cjs'])),
    css: measure(await read(['.css'])),
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
