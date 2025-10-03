import { atomicProperties } from './atoms.css.js';

export function getAtomsAndProps(
  props: Record<string, unknown>,
): [atomsClassNames: Record<string, unknown>, props: Record<string, unknown>] {
  const atomProps: Record<string, unknown> = {};
  const otherProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(props)) {
    // biome-ignore lint/suspicious/noPrototypeBuiltins: Internal check only
    if (atomicProperties.hasOwnProperty(name)) {
      atomProps[name] = value;
    } else {
      otherProps[name] = value;
    }
  }

  return [atomProps, otherProps];
}
