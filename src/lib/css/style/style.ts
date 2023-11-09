import { StyleRule, style as vanillaExtractStyle } from '@vanilla-extract/css';
import { Atoms, atoms } from '../atoms';

type StyleRuleWithAtoms = Omit<StyleRule, keyof Atoms> & {
  [K in keyof Atoms]?: K extends keyof StyleRule
    ? // eslint-disable-next-line @typescript-eslint/ban-types
      Atoms[K] | (string & {}) | number // Could type it as: Atoms[K] | StyleRule[K]
    : Atoms[K];
};

export function style(props: StyleRuleWithAtoms | (StyleRuleWithAtoms | string)[]): string {
  const styleRule: Record<string, unknown> = {};
  const atomClassNames: string[] = [];

  if (Array.isArray(props)) {
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
      // So use try/catch to fallback to raw CSS values

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
