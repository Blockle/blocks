#!/usr/bin/env node

/**
 * Changeset version script that automatically updates peerDependencies
 * This runs after changeset version updates package versions but before commit
 */

import { execSync } from 'node:child_process';

console.log('🔍 Post-version hook: Updating peerDependencies...');

try {
  // Run our peer dependency update script
  execSync('npm run update-peer-deps', { stdio: 'inherit' });

  // Check if there are any changes to package.json files
  const gitStatus = execSync('git status --porcelain packages/*/package.json', {
    encoding: 'utf8',
  });

  if (gitStatus.trim()) {
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
