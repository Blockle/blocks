import { sprinkles } from '../../sprinkles/sprinkles.css';
import type { UknownRecord } from '../react/mergeProps';

export function splitSpinklesAndComponentProps(
  props: UknownRecord,
): [atomsClassNames: UknownRecord, props: UknownRecord] {
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
