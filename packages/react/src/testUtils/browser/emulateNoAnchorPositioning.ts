// What the `@supports` gates around CSS anchor positioning test for
const gate = 'anchor-scope';

type Swap = {
  parent: CSSStyleSheet | CSSGroupingRule;
  index: number;
  original: string;
};

// `@supports X { … }` becomes `@supports not (X) { … }`, and back
function flip(rule: CSSSupportsRule) {
  const condition = rule.conditionText.trim();
  const flipped = condition.startsWith('not ')
    ? condition.slice(4)
    : `not (${condition})`;
  const body = Array.from(rule.cssRules, (inner) => inner.cssText).join('\n');

  return `@supports ${flipped} {\n${body}\n}`;
}

function collect(parent: CSSStyleSheet | CSSGroupingRule, swaps: Swap[]) {
  const rules = parent.cssRules;

  for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];

    if (rule instanceof CSSSupportsRule && rule.conditionText.includes(gate)) {
      swaps.push({ parent, index, original: rule.cssText });
    } else if (rule instanceof CSSGroupingRule) {
      collect(rule, swaps);
    }
  }
}

/**
 * Makes the page's styles behave as in a browser without CSS anchor
 * positioning, by inverting every `@supports` rule that tests for it. Returns a
 * function that puts the original rules back. Only covers styles already on the
 * page, so call it after rendering.
 */
export function emulateNoAnchorPositioning(): () => void {
  const swaps: Swap[] = [];

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      collect(sheet, swaps);
    } catch {
      // A cross-origin sheet hides its rules; it holds none of ours
    }
  }

  for (const { parent, index } of swaps) {
    const rule = parent.cssRules[index] as CSSSupportsRule;
    const flipped = flip(rule);

    parent.deleteRule(index);
    parent.insertRule(flipped, index);
  }

  return () => {
    for (const { parent, index, original } of swaps) {
      parent.deleteRule(index);
      parent.insertRule(original, index);
    }
  };
}
