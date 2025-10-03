import { classnames } from '../classnames/classnames.js';
import { composeRefs } from './refs.js';

export type UnknownRecord = Record<string, unknown>;

export function mergeProps(
  slotProps: UnknownRecord,
  childProps: UnknownRecord,
) {
  const overrideProps: UnknownRecord = {};

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
    } else {
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
          overrideProps[propName] = composeRefs(
            slotPropValue as React.Ref<unknown>,
            childPropValue as React.Ref<unknown>,
          );
          break;
        }
        default: {
          overrideProps[propName] = childPropValue;
        }
      }
    }
  }

  return { ...slotProps, ...overrideProps };
}
