import { layers } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { momotaro } from './index.js';

// Inspecting the stylesheets is the behaviour under test: a momotaro rule
// outside `blockle-theme` would beat Atom props and an app's own classes.

function momotaroSheets() {
  // Sheets are told apart by the source file their dev style tag points at.
  // Basenames alone clash with other packages' files.
  return Array.from(
    document.querySelectorAll<HTMLStyleElement>('style[data-vite-dev-id]'),
  )
    .filter((tag) =>
      tag.dataset.viteDevId?.includes('/packages/theme-momotaro/src/'),
    )
    .map((tag) => tag.sheet)
    .filter((sheet): sheet is CSSStyleSheet => sheet !== null);
}

// Token rules (only custom properties, plus the color-scheme a color mode
// sets) stay outside the layer on purpose. Judged by shape, not by file.
function isTokenRule(rule: CSSStyleRule) {
  const names = Array.from(rule.style);

  return (
    names.length > 0 &&
    names.every((name) => name.startsWith('--') || name === 'color-scheme')
  );
}

function findUnlayeredRules(sheets: CSSStyleSheet[]) {
  const outside: string[] = [];

  for (const sheet of sheets) {
    forEachRule(sheet.cssRules, false, (rule, inThemeLayer) => {
      if (rule instanceof CSSStyleRule && !inThemeLayer && !isTokenRule(rule)) {
        outside.push(rule.cssText);
      }
    });
  }

  return outside;
}

function findUndefinedClasses(sheets: CSSStyleSheet[], names: string[]) {
  const defined = new Set<string>();
  const classPattern = /\.((?:\\.|[\w-])+)/g;

  for (const sheet of sheets) {
    forEachRule(sheet.cssRules, false, (rule) => {
      if (rule instanceof CSSStyleRule) {
        for (const [, name] of rule.selectorText.matchAll(classPattern)) {
          defined.add((name ?? '').replace(/\\(.)/g, '$1'));
        }
      }
    });
  }

  return names.filter((name) => !defined.has(name));
}

function sheetOf(css: string) {
  const sheet = new CSSStyleSheet();

  sheet.replaceSync(css);

  return sheet;
}

function forEachRule(
  rules: CSSRuleList,
  inThemeLayer: boolean,
  visit: (rule: CSSRule, inThemeLayer: boolean) => void,
) {
  for (const rule of Array.from(rules)) {
    // Keyframes can't take a layer and don't compete on precedence
    if (rule instanceof CSSKeyframesRule) {
      continue;
    }

    visit(rule, inThemeLayer);

    if (rule instanceof CSSGroupingRule) {
      const isThemeLayer =
        rule instanceof CSSLayerBlockRule && rule.name === layers.theme;

      forEachRule(rule.cssRules, inThemeLayer || isThemeLayer, visit);
    }
  }
}

function themeClassNames(): string[] {
  const names = new Set<string>();

  function collect(value: unknown, parentKey?: string) {
    if (typeof value === 'string') {
      for (const name of value.split(' ')) {
        // A theme part without declarations, such as Tooltip's root, is ''
        if (name) {
          names.add(name);
        }
      }
    } else if (Array.isArray(value)) {
      for (const item of value) {
        collect(item, parentKey);
      }
    } else if (value && typeof value === 'object') {
      for (const [childKey, child] of Object.entries(value)) {
        // Default and compound variant selectors are values, not classes
        if (childKey === 'defaultVariants') {
          continue;
        }

        if (parentKey === 'compoundVariants') {
          collect((child as { style: string }).style, childKey);
        } else {
          collect(child, childKey);
        }
      }
    }
  }

  collect(momotaro.components);

  return Array.from(names);
}

describe('momotaro stylesheets', () => {
  it('finds momotaro sheets', () => {
    expect(momotaroSheets().length).toBeGreaterThan(0);
  });

  it('puts every style rule in the theme layer', () => {
    expect(findUnlayeredRules(momotaroSheets())).toEqual([]);
  });

  it('defines every theme class itself, with no atom or foreign class mixed in', () => {
    expect(findUndefinedClasses(momotaroSheets(), themeClassNames())).toEqual(
      [],
    );
  });
});

describe('layer guard checks', () => {
  it('reports an unlayered rule', () => {
    const sheet = sheetOf('.loose { color: red; }');

    expect(findUnlayeredRules([sheet])).toEqual([sheet.cssRules[0]?.cssText]);
  });

  it('reports a rule in another layer', () => {
    const sheet = sheetOf('@layer blockle-atom { .other { color: red; } }');

    expect(findUnlayeredRules([sheet])).toHaveLength(1);
  });

  it('accepts a rule in the theme layer, nested in a media query too', () => {
    const sheet = sheetOf(
      `@layer ${layers.theme} { .ok { color: red; } @media (min-width: 1px) { .also { color: red; } } }`,
    );

    expect(findUnlayeredRules([sheet])).toEqual([]);
  });

  it('exempts an unlayered rule that only declares custom properties', () => {
    const sheet = sheetOf(':root { --a: 1; --b: 2; }');

    expect(findUnlayeredRules([sheet])).toEqual([]);
  });

  it('reports an unlayered rule that mixes in a real declaration', () => {
    const sheet = sheetOf(':root { --a: 1; color: red; }');

    expect(findUnlayeredRules([sheet])).toHaveLength(1);
  });

  it('reports a theme class that no sheet defines', () => {
    const sheet = sheetOf(
      `@layer ${layers.theme} { .defined { color: red; } }`,
    );

    expect(findUndefinedClasses([sheet], ['defined', 'missing'])).toEqual([
      'missing',
    ]);
  });
});
