import { StyleRule, style as vanillaExtractStyle } from '@vanilla-extract/css';
import { Atoms, atoms } from '../atoms';

type ComplexStyleRuleWithAtoms = Omit<StyleRule, keyof Atoms> & {
  [K in keyof Atoms]?: K extends keyof StyleRule
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      Atoms[K] | (string & {}) | number // Could type it as: Atoms[K] | StyleRule[K]
    : Atoms[K];
};

export function style(
  props: ComplexStyleRuleWithAtoms | (ComplexStyleRuleWithAtoms | string)[],
): string {
  const styleRule: Record<string, unknown> = {};
  // const atomsValue: Record<string, unknown> = {};
  const atomClassNames: string[] = [];

  if (Array.isArray(props)) {
    // eslint-disable-next-line unicorn/no-array-callback-reference
    return props
      .map((rule) => {
        if (typeof rule === 'string') {
          return rule;
        }

        return style(rule);
      })
      .join(' ');
  }

  for (const [name, value] of Object.entries(props)) {
    if ((atoms.properties as Set<string>).has(name)) {
      // atoms function throws an error if the value is not valid
      // So use this to fallback to raw CSS values
      // It would be nice to have a function that checks if a value is valid
      // But since this is code runs at build time, we don't care about performance
      // Something like:
      // atoms.isValidValue('background', value);
      // atoms.isValidValue(name, value);

      try {
        atomClassNames.push(atoms({ [name]: value }));
      } catch {
        styleRule[name] = value;
      }
    } else {
      styleRule[name] = value;
    }
  }

  return vanillaExtractStyle([styleRule, ...atomClassNames]);
}
