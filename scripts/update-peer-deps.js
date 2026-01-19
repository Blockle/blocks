#!/usr/bin/env node

import { glob } from 'glob';

import { readFileSync, writeFileSync } from 'node:fs';

// Define external peer dependencies and their desired version ranges
const externalPeerDeps = new Map([
  ['react', '>=19.1.0'],
  ['react-dom', '>=19.1.0'],
]);

/**
 * Automatically updates peerDependencies in all packages to match current versions
 */
async function updatePeerDependencies() {
  // Find all package.json files in packages
  const packageFiles = await glob('packages/*/package.json');

  // Read all packages to get current versions
  const packages = new Map();
  const packageData = new Map();

  for (const file of packageFiles) {
    const content = readFileSync(file, 'utf8');
    const pkg = JSON.parse(content);
    packages.set(pkg.name, pkg.version);
    packageData.set(pkg.name, { file, content: pkg });
  }

  console.log('📦 Found packages:');
  packages.forEach((version, name) => {
    console.log(`  ${name}@${version}`);
  });
  console.log('');

  // Update peerDependencies
  let updatedCount = 0;

  for (const [packageName, data] of packageData.entries()) {
    const { file, content: pkg } = data;
    let hasChanges = false;

    if (pkg.peerDependencies) {
      const newPeerDeps = { ...pkg.peerDependencies };

      for (const [depName, currentRange] of Object.entries(
        pkg.peerDependencies,
      )) {
        if (packages.has(depName)) {
          const currentVersion = packages.get(depName);
          const [majorVersion, minorVersion] = currentVersion.split('.');
          const newRange = `>=${majorVersion}.${minorVersion}.x`;

          if (currentRange !== newRange) {
            console.log(`🔄 ${packageName}:`);
            console.log(`  ${depName}: ${currentRange} → ${newRange}`);
            newPeerDeps[depName] = newRange;
            hasChanges = true;
          }
        }

        if (externalPeerDeps.has(depName)) {
          const newRange = externalPeerDeps.get(depName);

          if (currentRange !== newRange) {
            console.log(`🔄 ${packageName}:`);
            console.log(`  ${depName}: ${currentRange} → ${newRange}`);
            newPeerDeps[depName] = newRange;
            hasChanges = true;
          }
        }
      }

      if (hasChanges) {
        pkg.peerDependencies = newPeerDeps;
        writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
        updatedCount++;
      }
    }
  }

  console.log('');
  if (updatedCount > 0) {
    console.log(`✅ Updated ${updatedCount} package(s)`);
  } else {
    console.log('✅ All peerDependencies are already up to date');
  }
}

// Run the script
updatePeerDependencies().catch(console.error);
