import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';

import { breakpoints } from '../css/breakpoint/breakpoint.js';
import { getNameFromVanillaCSSVar } from '../css/getNameFromVanillaCSSVar.js';
import { layers } from '../css/layers.css.js';
import { vars } from '../css/vars.css.js';
import { atoms } from './atoms.js';

// The stylesheets are the behaviour under test: a rule outside `blockle-atom`
// ties with an app's own unlayered class, and stylesheet order decides.

type RuleEntry = { rule: CSSStyleRule; layerName?: string };

// `padding: [4, 1]` changes value at the tablet breakpoint
const aboveTablet = breakpoints.tablet + 100;
const belowTablet = breakpoints.tablet - 100;

function* rulesOf(
  rules: CSSRuleList,
  layerName?: string,
): Generator<RuleEntry> {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      yield { rule, layerName };
    } else if (rule instanceof CSSGroupingRule) {
      const name = rule instanceof CSSLayerBlockRule ? rule.name : layerName;

      yield* rulesOf(rule.cssRules, name);
    }
  }
}

function rulesForClass(className: string) {
  const found: RuleEntry[] = [];
  const classPattern = /\.((?:\\.|[\w-])+)/g;

  for (const sheet of Array.from(document.styleSheets)) {
    for (const entry of rulesOf(sheet.cssRules)) {
      const names = Array.from(
        entry.rule.selectorText.matchAll(classPattern),
        ([, name]) => (name ?? '').replace(/\\(.)/g, '$1'),
      );

      if (names.includes(className)) {
        found.push(entry);
      }
    }
  }

  return found;
}

const defaultViewport = {
  width: window.innerWidth,
  height: window.innerHeight,
};

describe('responsive Atom classes (browser)', () => {
  it('puts every class of an object-valued Atom in the atom layer', () => {
    const classes = atoms({ padding: [4, 1] }).split(' ');

    // Default class plus the tablet, desktop and wide classes
    expect(classes.length).toBeGreaterThan(1);

    for (const className of classes) {
      const rules = rulesForClass(className);

      expect(rules.length).toBeGreaterThan(0);
      expect(rules.map(({ layerName }) => layerName)).toEqual(
        rules.map(() => layers.atom),
      );
    }
  });

  describe('on an element', () => {
    let element: HTMLElement;
    let appStyle: HTMLStyleElement;

    beforeEach(() => {
      // Space tokens need a theme; give the element a literal value instead
      element = document.createElement('div');
      for (const [step, px] of [
        [1, '4px'],
        [4, '16px'],
      ] as const) {
        element.style.setProperty(
          getNameFromVanillaCSSVar(vars.space[step]),
          px,
        );
      }

      appStyle = document.createElement('style');
      appStyle.textContent = '.app { padding: 99px; }';
      // Before the Atom sheets, so source order can't favour the app
      document.head.prepend(appStyle);
      document.body.append(element);
    });

    afterEach(async () => {
      await page.viewport(defaultViewport.width, defaultViewport.height);
      element.remove();
      appStyle.remove();
    });

    it("lets an app's unlayered className beat a responsive Atom prop", async () => {
      await page.viewport(aboveTablet, 768);
      element.className = `${atoms({ padding: [4, 1] })} app`;

      expect(getComputedStyle(element).paddingTop).toBe('99px');
    });

    it('lets a larger breakpoint override the base value', async () => {
      await page.viewport(aboveTablet, 768);
      element.className = atoms({ padding: [4, 1] });

      expect(getComputedStyle(element).paddingTop).toBe('4px');
    });

    it('keeps the base value below the tablet breakpoint', async () => {
      await page.viewport(belowTablet, 768);
      element.className = atoms({ padding: [4, 1] });

      expect(getComputedStyle(element).paddingTop).toBe('16px');
    });
  });
});
