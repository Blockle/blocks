import { type HTMLElementProps, mergeProps } from '@blockle/blocks-core';
import type React from 'react';
import { Children, cloneElement, isValidElement } from 'react';
import { Slot } from './Slot/Slot';

type TemplateProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<Element>;
};

/**
 * Create a Template component that can render as a child of another component with asChild prop.
 *
 * Example
 * // Create a Template and Slot components with div as default element
 * const { Template, Slot } = createAsChildContainer('div');
 *
 * const MyComponent = ({ children, asChild, ...restProps }) => {
 *  return (
 *   <Template asChild={asChild} {...restProps}>
 *     <Slot>{childen}</Slot> // Slot is required, will be replaced with children
 *   </Template>
 * );
 * }
 *
 * <MyComponent className="test">Not a link</MyComponent> // Renders as <div class="test">Not a link</div>
 * <MyComponent className="test"><a href="#">Link</a></MyComponent> // Renders as <div class="test"><a href="#">Link</a></div>
 * <MyComponent className="test" asChild><a href="#">Link</a></MyComponent> // Renders as <a href="#" class="test">Link</a>
 */
export function createSlottable<T extends keyof HTMLElementTagNameMap>(
  defaultElement: T,
) {
  // Cast as any to avoid TS errors when using <Tag />
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const Tag = defaultElement as any;

  type Element = HTMLElementTagNameMap[T];
  type HTMLProps = HTMLElementProps<Element>;

  const Template: React.FC<TemplateProps & HTMLProps> = ({
    asChild,
    children,
    ref,
    ...rootProps
  }) => {
    // Return default element
    if (!asChild) {
      const tagProps = { ref, ...rootProps };

      return <Tag {...tagProps}>{children}</Tag>;
    }

    const childrenArray = Children.toArray(children);

    // Find Slot element
    const slotIndex = childrenArray.findIndex((child) => {
      if (!isValidElement(child)) {
        return false;
      }

      return child.type === Slot;
    });

    const slot = childrenArray[slotIndex];

    if (!slot) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Template: No Slot provided');
      }

      return null;
    }

    if (!isValidElementWithChildren(slot)) {
      return null;
    }

    if (!isValidElement(slot.props.children)) {
      if (process.env.NODE_ENV !== 'production') {
        if (Children.toArray(slot.props.children).length === 0) {
          console.error('When using asChild, at least one child is required');
        } else {
          console.error('When using asChild, only one child is allowed');
        }
      }

      return null;
    }

    if (!isValidElementWithChildren(slot.props.children)) {
      return null;
    }

    // Render children inside Slot
    const nextChildren = [...childrenArray];

    if (nextChildren.length === 1 && !slot.props.children.props.children) {
      return cloneElement(
        slot.props.children,
        mergeProps(rootProps, slot.props.children.props),
      );
    }

    // Replace Slot with children
    nextChildren[slotIndex] = slot.props.children.props
      .children as React.ReactElement;

    return cloneElement(
      slot.props.children,
      mergeProps(rootProps, slot.props.children.props),
      nextChildren,
    );
  };

  return {
    Template,
    Slot,
  };
}

function isValidElementWithChildren(
  child: React.ReactNode,
): child is React.ReactElement<{ children: React.ReactNode; ref?: unknown }> {
  return isValidElement(child) && !!child.props;
}
