import { atoms } from '../css/atoms/sprinkles.css';

/**
 *
 */
export function getAtomsAndProps(
  props: Record<string, unknown>,
): [atomsClassNames: Record<string, unknown>, props: Record<string, unknown>] {
  const atomProps: Record<string, unknown> = {};
  const otherProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(props)) {
    if ((atoms.properties as Set<string>).has(name)) {
      atomProps[name] = value;
    } else {
      otherProps[name] = value;
    }
  }

  return [atomProps, otherProps];
}
