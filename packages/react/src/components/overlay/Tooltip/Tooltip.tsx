'use client';

import { type ComponentThemes, composeRefs } from '@blockle/blocks-core';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { Popover, type PopoverProps } from '../Popover';

type ReactElement = React.ReactElement<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  string | React.JSXElementConstructor<any>
>;

type TooltipTheme = ComponentThemes['tooltip'];

export type TooltipProps = {
  align?: PopoverProps['align'];
  children: ReactElement;
  label: React.ReactNode;
  colorScheme?: TooltipTheme['variants']['colorScheme'];
};

export const Tooltip: React.FC<TooltipProps> = ({
  align = 'top',
  children,
  label,
  colorScheme,
}) => {
  const id = useId();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const tooltipClassName = useComponentStyles('tooltip', {
    base: true,
    variants: { colorScheme },
  });

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
  }, []);

  if (Children.count(children) !== 1) {
    throw new Error('Tooltip component can only have one child');
  }

  const child = Children.toArray(children)[0] as ReactElement & {
    ref?: React.Ref<HTMLElement>;
  };

  if (!isValidElement(child)) {
    return null;
  }

  return (
    <>
      {cloneElement(child, {
        ref: composeRefs(ref, child.ref),
        'aria-describedby': open ? id : undefined,
      })}
      <Popover
        id={id}
        role="tooltip"
        anchorElement={ref}
        open={open}
        onRequestClose={() => {
          setOpen(false);
        }}
        align={align}
        className={tooltipClassName}
      >
        {label}
      </Popover>
    </>
  );
};
