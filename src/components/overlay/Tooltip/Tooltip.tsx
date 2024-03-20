import { Children, cloneElement, isValidElement, useEffect, useId, useRef, useState } from 'react';
import { composeRefs } from '../../../lib/react/react';
import { Dropdown, DropdownProps } from '../Dropdown/Dropdown';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ReactElement = React.ReactElement<any, string | React.JSXElementConstructor<any>>;

export type TooltipProps = {
  align?: DropdownProps['align'];
  children: ReactElement;
  label: React.ReactNode;
};

export const Tooltip: React.FC<TooltipProps> = ({ align = 'top', children, label }) => {
  const id = useId();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    function onEnter() {
      setOpen(true);
    }

    function onLeave() {
      setOpen(false);
    }

    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    element.addEventListener('focusin', onEnter);
    element.addEventListener('focusout', onLeave);

    return () => {
      element.removeEventListener('mouseenter', onEnter);
      element.removeEventListener('mouseleave', onLeave);
      element.removeEventListener('focusin', onEnter);
      element.removeEventListener('focusout', onLeave);
    };
  }, [ref, setOpen]);

  if (Children.count(children) !== 1) {
    throw new Error('Tooltip component can only have one child');
  }

  const child = Children.toArray(children)[0] as ReactElement & { ref?: React.Ref<HTMLElement> };

  if (!isValidElement(child)) {
    return null;
  }

  return (
    <>
      {cloneElement(child, {
        ref: composeRefs(ref, child.ref),
        ['aria-describedby']: open ? id : undefined,
      })}
      {/* TODO Rename dropdown to Popover? */}
      <Dropdown
        id={id}
        role="tooltip"
        anchorElement={ref}
        open={open}
        onRequestClose={() => {
          setOpen(false);
        }}
        align={align}
      >
        {label}
      </Dropdown>
    </>
  );
};
