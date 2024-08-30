/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { UknownRecord, mergeProps } from '../../../lib/react/mergeProps';
import { composeRefs } from '../../../lib/react/react';

// Subset of HTML element tags that can be used as a default element
type HTMLElementTags = 'a' | 'article' | 'button' | 'div' | 'p' | 'section' | 'span' | 'strong';

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

    // No Slot provided, render Slottable with first child and ignore the rest of the children
    if (!slot) {
      const Slot = childrenArray[0] as React.FunctionComponentElement<any>;

      if (!isValidElement(childrenArray[0])) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Slottable: First child is not a valid React element');
        }

        return null;
      }

      if (!isValidElement(Slot)) {
        return null;
      }

      return cloneElement(
        Slot,
        {
          ...mergeProps(slotProps, Slot.props),
          ref: composeRefs(ref, Slot.ref),
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
      {
        ...mergeProps(slotProps, slot.props),
        ref: composeRefs(ref, slot.props.children.ref),
      },
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
