#!/usr/bin/env node

/**
 * Changeset version script that automatically updates peerDependencies
 * This runs after changeset version updates package versions but before commit
 */

import { glob } from 'glob';

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

/** The peerDependencies of every package, keyed by its package.json path. */
async function readPeerDependencies() {
  const files = await glob('packages/*/package.json');

  return JSON.stringify(
    Object.fromEntries(
      files
        .sort()
        .map((file) => [
          file,
          JSON.parse(readFileSync(file, 'utf8')).peerDependencies ?? {},
        ]),
    ),
  );
}

console.log('🔍 Post-version hook: Updating peerDependencies...');

try {
  const before = await readPeerDependencies();

  execSync('npm run update-peer-deps', { stdio: 'inherit' });

  if ((await readPeerDependencies()) !== before) {
    console.log(
      '📝 PeerDependencies were updated and will be included in version commit',
    );
  } else {
    console.log('✅ PeerDependencies were already up to date');
  }
} catch (error) {
  console.error('❌ Error updating peerDependencies:', error.message);
  process.exit(1);
}
