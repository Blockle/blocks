import { Children, cloneElement, forwardRef, isValidElement } from 'react';
import { mergeProps } from '../react/mergeProps';
import { composeRefs } from '../react/react';

type TemplateProps = {
  asChild?: boolean;
  children?: React.ReactNode;
};

type CreateTemplate<T extends keyof HTMLElementTagNameMap> = {
  defaultElement: T;
  inheritProps?: (keyof React.HTMLProps<T>)[];
};

export function createAsChildContainer<T extends keyof HTMLElementTagNameMap>({
  defaultElement,
  inheritProps,
}: CreateTemplate<T>) {
  // Cast as any to avoid TS errors when using <Tag />
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = defaultElement as any;

  type HTMLProps = React.PropsWithoutRef<React.HTMLProps<T>>;

  const Template = forwardRef<HTMLElementTagNameMap[T], TemplateProps & HTMLProps>(
    function Template({ asChild, children, ...rootProps }, ref) {
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
        if (process.env.NODE_ENV === 'development') {
          console.error('Template: No Slot provided');
        }

        return null;
      }

      if (!isValidElement(slot) || !isValidElement(slot.props.children)) {
        return null;
      }

      // Render children inside Slot
      const nextChildren = [...childrenArray];
      // Replace Slot with children
      nextChildren[slotIndex] = slot.props.children.props.children;

      return cloneElement(
        slot.props.children,
        {
          ...mergeProps(rootProps, slot.props),
          ref: composeRefs(ref, slot.props.children.ref),
        },
        nextChildren,
      );
    },
  );

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
