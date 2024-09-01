import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { mergeProps } from '../react/mergeProps';
import { composeRefs } from '../react/refs';
import { HTMLElementProps } from '../utils/utils';

type TemplateProps = {
  asChild?: boolean;
  children?: React.ReactNode;
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
export function createAsChildTemplate<T extends keyof HTMLElementTagNameMap>(defaultElement: T) {
  // Cast as any to avoid TS errors when using <Tag />
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = defaultElement as any;

  type Element = HTMLElementTagNameMap[T];
  type HTMLProps = HTMLElementProps<Element>;

  const Template = forwardRef<Element, TemplateProps & HTMLProps>(function Template(
    { asChild, children, ...rootProps },
    ref,
  ) {
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

    if (!isValidElement(slot)) {
      return null;
    }

    if (
      !isValidElement(slot.props.children) ||
      Children.toArray(slot.props.children).length !== 1
    ) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('When using asChild, only one child is allowed');
      }

      return null;
    }

    if (!isValidElement(slot.props.children)) {
      return null;
    }

    // Render children inside Slot
    const nextChildren = [...childrenArray];

    if (nextChildren.length === 1 && !slot.props.children.props.children) {
      return cloneElement(slot.props.children, {
        ...mergeProps(rootProps, slot.props.children.props),
        ref: composeRefs(ref, slot.props.children.ref),
      });
    }

    // Replace Slot with children
    nextChildren[slotIndex] = slot.props.children.props.children;

    return cloneElement(
      slot.props.children,
      {
        ...mergeProps(rootProps, slot.props.children.props),
        ref: composeRefs(ref, slot.props.children.ref),
      },
      nextChildren,
    );
  });

  return {
    Template,
    Slot,
  };
}

// Slot
type SlotProps = {
  children: React.ReactNode;
};

const Slot: React.FC<SlotProps> = ({ children }) => {
  return children;
};
