import { StyleRule, style as vanillaExtractStyle } from '@vanilla-extract/css';
import { AnyString } from '../../utils/helpers';
import { Atoms, atoms } from '../atoms';

type StyleRuleWithAtoms = Omit<StyleRule, keyof Atoms> & {
  [K in keyof Atoms]?: K extends keyof StyleRule
    ? Atoms[K] | AnyString | number
    : Atoms[K];
};

/**
 * A wrapper around vanilla-extract's `style` function that allows you to use
 * atoms and raw CSS values in the same object.
 */
export function style(
  props: StyleRuleWithAtoms | (StyleRuleWithAtoms | string)[],
): string {
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
      // So use try/catch to fallback to raw CSS values when atoms throws

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
