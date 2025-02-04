import { classnames } from '../utils/classnames';
import { composeRefs } from './refs';

export type UknownRecord = Record<string, unknown>;

export function mergeProps(slotProps: UknownRecord, childProps: UknownRecord) {
  const overrideProps: UknownRecord = {};

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    if (childPropValue === undefined) {
      continue;
    }

    if (slotPropValue === undefined) {
      overrideProps[propName] = childPropValue;
      continue;
    }

    if (
      typeof slotPropValue === 'function' &&
      typeof childPropValue === 'function'
    ) {
      overrideProps[propName] = (...args: unknown[]) => {
        childPropValue(...args);
        slotPropValue(...args);
      };
    } else
      switch (propName) {
        case 'style': {
          overrideProps[propName] = { ...slotPropValue, ...childPropValue };
          break;
        }
        case 'className': {
          overrideProps[propName] = classnames(slotPropValue, childPropValue);
          break;
        }
        case 'ref': {
          overrideProps[propName] = composeRefs(slotPropValue, childPropValue);
          break;
        }
        default: {
          overrideProps[propName] = childPropValue;
        }
      }
  }

  return { ...slotProps, ...overrideProps };
}
