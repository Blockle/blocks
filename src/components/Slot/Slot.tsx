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

    const slotChildIndex = childrenArray.findIndex((child) => {
      if (!isValidElement(child)) {
        return false;
      }

      return child.type === SlotChildren;
    });

    if (slotChildIndex === -1) {
      throw new Error('Expect <SlotChildren />');
    }

    const slotTarget = childrenArray[slotChildIndex];

    if (!isValidElement(slotTarget)) {
      throw new Error('Provide a valid react element');
    }

    const { children: childChildren } = slotTarget.props;

    if (!isValidElement(childChildren) && typeof childChildren !== 'function') {
      throw new Error('Provide a valid react element when using asChild prop');
    }

    return cloneElement(
      childChildren,
      mergeProps(slotProps, childChildren.props),
      // Replace SlotChildren with original children
      childrenArray.map((child) => {
        if (!isValidElement(child)) {
          return child;
        }

        // Replace SlotChildren with children of SlotChildren
        if (child.type === SlotChildren) {
          return childChildren.props.children;
        }

        return child;
      }),
    );
  }

  return forwardRef<any, SlotProps>(Slot) as (
    props: SlotProps,
    ref: React.ForwardedRef<any>,
  ) => ReturnType<typeof Slot>;
}

type SlottableProps = {
  children: React.ReactNode;
};

export const SlotChildren: React.FC<SlottableProps> = ({ children }) => children;
