import { layers } from '@blockle/blocks-core';
import { describe, expect, it } from 'vitest';

import { momotaro } from './index.js';

// Inspecting the stylesheets is the behaviour under test: a momotaro rule
// outside `blockle-theme` would beat Atom props and an app's own classes.

function momotaroSheets() {
  // Sheets are told apart by the source file their dev style tag points at.
  // Basenames alone clash with other packages' files. Only the component
  // themes are layered: the token sheets (custom properties and color mode
  // values, no Component theme) stay outside on purpose.
  return Array.from(
    document.querySelectorAll<HTMLStyleElement>('style[data-vite-dev-id]'),
  )
    .filter((tag) =>
      tag.dataset.viteDevId?.includes(
        '/packages/theme-momotaro/src/components/',
      ),
    )
    .map((tag) => tag.sheet)
    .filter((sheet): sheet is CSSStyleSheet => sheet !== null);
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

  function collect(value: unknown, key?: string) {
    if (typeof value === 'string') {
      for (const name of value.split(' ')) {
        // A theme part without declarations, such as Tooltip's root, is ''
        if (name) {
          names.add(name);
        }
      }
    } else if (Array.isArray(value)) {
      for (const item of value) {
        collect(item, key);
      }
    } else if (value && typeof value === 'object') {
      for (const [childKey, child] of Object.entries(value)) {
        // Default and compound variant selectors are values, not classes
        if (childKey === 'defaultVariants') {
          continue;
        }

        if (key === 'compoundVariants') {
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
    const outside: string[] = [];

    for (const sheet of momotaroSheets()) {
      forEachRule(sheet.cssRules, false, (rule, inThemeLayer) => {
        if (rule instanceof CSSStyleRule && !inThemeLayer) {
          outside.push(rule.cssText);
        }
      });
    }

    expect(outside).toEqual([]);
  });

  it('defines every theme class itself, with no atom or foreign class mixed in', () => {
    const defined = new Set<string>();
    const classPattern = /\.((?:\\.|[\w-])+)/g;

    for (const sheet of momotaroSheets()) {
      forEachRule(sheet.cssRules, false, (rule) => {
        if (rule instanceof CSSStyleRule) {
          for (const [, name] of rule.selectorText.matchAll(classPattern)) {
            defined.add((name ?? '').replace(/\\(.)/g, '$1'));
          }
        }
      });
    }

    const foreign = themeClassNames().filter((name) => !defined.has(name));

    expect(foreign).toEqual([]);
  });
});
