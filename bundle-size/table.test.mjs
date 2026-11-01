import { formatBytes, formatTable } from './table.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

test('formatBytes groups thousands with a comma', () => {
  assert.equal(formatBytes(0), '0');
  assert.equal(formatBytes(999), '999');
  assert.equal(formatBytes(12345), '12,345');
  assert.equal(formatBytes(1234567), '1,234,567');
});

test('formatTable prints one row per scenario and kind, aligned', () => {
  const results = {
    baseline: {
      js: { minified: 100, gzipped: 60 },
      css: { minified: 2000, gzipped: 700 },
    },
    button: {
      js: { minified: 12345, gzipped: 4000 },
      css: { minified: 3000, gzipped: 900 },
    },
  };

  assert.equal(
    formatTable(results),
    [
      'scenario  kind  minified  gzipped',
      '--------  ----  --------  -------',
      'baseline  js         100       60',
      'baseline  css      2,000      700',
      'button    js      12,345    4,000',
      'button    css      3,000      900',
    ].join('\n'),
  );
});
