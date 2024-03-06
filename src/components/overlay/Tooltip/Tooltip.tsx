import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownProps } from '../Dropdown/Dropdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactElement = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export type TooltipProps = {
  children: ReactElement;
  label: React.ReactNode;
  align?: DropdownProps['align'];
};

export const Tooltip: React.FC<TooltipProps> = ({ children, label }) => {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const onMouseEnter = () => {
      setOpen(true);
    };

    const onMouseLeave = () => {
      setOpen(false);
    };

    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, setOpen]);

  if (Children.count(children) !== 1) {
    throw new Error('Tooltip component can only have one child');
  }

  const child = Children.toArray(children)[0] as ReactElement;

  return (
    <>
      {cloneElement(child, {
        ref,
      })}
      {/* TODO Rename dropdown to Popover? */}
      <Dropdown
        anchorElement={ref}
        open={open}
        onRequestClose={() => {
          setOpen(false);
        }}
        align="top"
      >
        {label}
      </Dropdown>
    </>
  );
};
