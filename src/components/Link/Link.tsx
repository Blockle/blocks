import { forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { Atoms } from '../../lib/css/atoms';
import { LinkTheme } from '../../lib/theme/componentThemes';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { createSlottable } from '../Slot/Slot';

export type LinkProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  underline?: LinkTheme['variants']['underline'];
  variant?: LinkTheme['variants']['variant'];
} & Atoms &
  HTMLElementProps<HTMLAnchorElement>;

const Slottable = createSlottable('a');

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { asChild, className, children, variant, underline, ...restProps },
  ref,
) {
  const linkClassName = useComponentStyles('link', {
    base: true,
    variants: { variant, underline },
  });

  return (
    <Slottable
      asChild={asChild}
      ref={ref}
      className={classnames(className, linkClassName)}
      {...restProps}
    >
      {children}
    </Slottable>
  );
});
