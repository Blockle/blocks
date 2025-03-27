import type { UknownRecord } from '../utils/react/mergeProps';
import { sprinkles } from './sprinkles.css';

export function getAtomsAndProps(
  props: UknownRecord,
): [atoms: UknownRecord, props: UknownRecord] {
  const atomProps: UknownRecord = {};
  const otherProps: UknownRecord = {};

  for (const [name, value] of Object.entries(props)) {
    if ((sprinkles.properties as Set<string>).has(name)) {
      atomProps[name] = value;
    } else {
      otherProps[name] = value;
    }
  }

  return [atomProps, otherProps];
}
