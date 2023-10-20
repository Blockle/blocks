/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Children, cloneElement, forwardRef, isValidElement, useRef } from 'react';

type HTMLElementTags = 'div' | 'span' | 'button';

type UknownRecord = Record<string, unknown>;

export function createSlot<const E extends HTMLElementTags>(defaultElement: E) {
  type SlotProps = { asChild?: boolean } & React.HTMLProps<React.ElementRef<E>>;

  function Slot(props: SlotProps, ref?: React.ForwardedRef<any>): React.ReactElement | null {
    const { asChild, children, ...restProps } = props;
    const Component = defaultElement as HTMLElementTags;

    // Return default element
    if (!asChild) {
      return (
        <Component ref={ref} {...(restProps as UknownRecord)}>
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

    const { children: subChildren, ...restProps2 } = firstChild.props;

    // Merge refs
    // Merge props
    // - Special cases: classNames, functions

    console.log({
      ...restProps,
      ...restProps2,
    });

    return cloneElement(
      firstChild,
      {
        ...restProps,
        ...restProps2,
      },
      subChildren,
    );
  }

  return forwardRef<any, SlotProps>(Slot) as (
    props: SlotProps,
    ref: React.ForwardedRef<any>,
  ) => ReturnType<typeof Slot>;
}

// Example

const MySlot = createSlot('div');

export const XX2: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <MySlot
      asChild
      ref={ref}
      onClick={(event) => {
        event.preventDefault();
        console.log(event);
      }}
    >
      <a href="/">Link yooo 1</a>
    </MySlot>
  );
};
