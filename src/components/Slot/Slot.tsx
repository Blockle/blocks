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

// Cases 1: No SlotChildren, direct descendant
// const Slot = createSlot('div');
// <Slot>{children}</Slot>

// Cases 2: Slotted with SlotChildren
// const Slot = createSlot('div');
// <Slot>
//   <div>...</div>
//   <SlotChildren>{children}</SlotChildren>
// </Slot> -> Children of SlotChildren

/**
 * Notes:
 * - <Slot> can only have one child
 * - <Slot> can only be used once
 * - <Slot> can only be used as a direct descendant of <Slottable>
 */

export function createSlottable<E extends HTMLElementTags>(defaultElement: E) {
  type SlottableProps = { asChild?: boolean } & React.HTMLProps<React.ElementRef<any>>;

  function Slottable(
    props: SlottableProps,
    ref?: React.ForwardedRef<any>,
  ): React.ReactElement | null {
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

    // Find Slot element
    const slot = childrenArray.find((child) => {
      if (!isValidElement(child)) {
        return false;
      }

      return child.type === Slot;
    });

    // No Slot provided, render Slottable with first child
    if (!slot) {
      const Slot = childrenArray[0];

      if (!isValidElement(Slot)) {
        return null;
      }

      return cloneElement(
        Slot,
        {
          ...mergeProps(slotProps, Slot.props),
          ref,
        },
        Slot.props.children,
      );
    }

    if (!isValidElement(slot) || !isValidElement(slot.props.children)) {
      return null;
    }

    const newChildren = childrenArray.map((child) => {
      if (!isValidElement(child)) {
        return child;
      }

      if (child.type === Slot) {
        return slot.props.children.props.children;
      }

      return child;
    });

    return cloneElement(
      slot.props.children,
      { ...mergeProps(slotProps, slot.props), ref },
      newChildren,
    );
  }

  return forwardRef<any, SlottableProps>(Slottable) as (
    props: SlottableProps,
    ref: React.ForwardedRef<any>,
  ) => ReturnType<typeof Slottable>;
}

type SlotProps = {
  children: React.ReactNode;
};

export const Slot: React.FC<SlotProps> = ({ children }) => children;
