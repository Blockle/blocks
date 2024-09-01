import { classnames } from '../utils/classnames';

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

    if (typeof slotPropValue === 'function' && typeof childPropValue === 'function') {
      overrideProps[propName] = (...args: unknown[]) => {
        childPropValue(...args);
        slotPropValue(...args);
      };
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = classnames(slotPropValue, childPropValue);
    } else {
      overrideProps[propName] = childPropValue;
    }
  }

  return { ...slotProps, ...overrideProps };
}
