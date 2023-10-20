/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, cloneElement, forwardRef, isValidElement } from 'react';

type HTMLElementTags = 'a' | 'button' | 'div';
type UknownRecord = Record<string, unknown>;

function mergeProps(slotProps: UknownRecord, childProps: UknownRecord) {
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
      overrideProps[propName] = (...args: any[]) => {
        childPropValue(...args);
        slotPropValue(...args);
      };
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    } else {
      overrideProps[propName] = childPropValue;
    }
  }

  return { ...slotProps, ...overrideProps };
}

export function createSlot<const E extends HTMLElementTags>(defaultElement: E) {
  type SlotProps = { asChild?: boolean } & React.HTMLProps<React.ElementRef<E>>;

  function Slot(props: SlotProps, ref?: React.ForwardedRef<any>): React.ReactElement | null {
    const { asChild, children, ...slotProps } = props;
    const Component = defaultElement as HTMLElementTags;

    // Return default element
    if (!asChild) {
      return (
        <Component ref={ref} {...(slotProps as UknownRecord)}>
          {children}
        </Component>
      );
    }

    const childrenArray = Children.toArray(children);
    const firstChild = childrenArray[0];

    if (childrenArray.length === 0) {
      throw new Error('Expect one child');
    }

    if (childrenArray.length > 1) {
      throw new Error('Expect one element with prop `asChild`');
    }

    if (!isValidElement(firstChild)) {
      throw new Error('Provide a valid react element');
    }

    const { children: childChildren, ...childProps } = firstChild.props;

    return cloneElement(firstChild, mergeProps(slotProps, childProps), childChildren);
  }

  return forwardRef<any, SlotProps>(Slot) as (
    props: SlotProps,
    ref: React.ForwardedRef<any>,
  ) => ReturnType<typeof Slot>;
}
