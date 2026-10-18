/// <reference types="node" />

import { describe, expect, it } from 'vitest';

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Vitest runs without CSS output, so these tests check the theme sources.
const directory = dirname(fileURLToPath(import.meta.url));

function getSource(name: string) {
  return readFileSync(join(directory, `${name}.css.ts`), 'utf8');
}

const migratedComponents = [
  'alert',
  'dialog',
  'drawer',
  'popover',
  'progress',
  'spinner',
  'tooltip',
];

const rawColor = /rgba?\(|hsla?\(|#[0-9a-f]{3,8}\b/i;
const paletteKey = /['"](?:[a-z]+-[1-9]00|white|black)['"]|vars\.palette/;

describe('Momotaro feedback & overlay component themes', () => {
  it.each(migratedComponents)('%s uses no raw color values', (name) => {
    expect(getSource(name)).not.toMatch(rawColor);
  });

  it.each(migratedComponents)('%s uses no Palette shades', (name) => {
    expect(getSource(name)).not.toMatch(paletteKey);
  });

  it('dialog backdrop and surface follow the Color scheme', () => {
    const source = getSource('dialog');

    expect(source).toContain('vars.color.overlay');
    expect(source).toContain("backgroundColor: 'surfaceRaised'");
    expect(source).toContain("color: 'text'");
  });

  it.each([
    'drawer',
    'popover',
  ])('%s surface follows the Color scheme', (name) => {
    const source = getSource(name);

    expect(source).toContain("backgroundColor: 'surfaceRaised'");
    expect(source).toContain("color: 'text'");
  });

  it('tooltip always uses the inverse surface and text roles', () => {
    const source = getSource('tooltip');

    expect(source).toContain('vars.color.surfaceInverse');
    expect(source).toContain('vars.color.textInverse');
    expect(source).not.toContain('colorScheme');
  });
});
