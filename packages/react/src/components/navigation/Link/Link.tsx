'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';

type LinkTheme = ComponentThemes['link'];

export type LinkProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement>;
  underline?: LinkTheme['variants']['underline'];
  variant?: LinkTheme['variants']['variant'];
} & MarginAtoms &
  HTMLElementProps<HTMLAnchorElement>;

const [Template, Slot] = createSlottable('a');

export const Link: React.FC<LinkProps> = ({
  asChild,
  children,
  className,
  ref,
  underline,
  variant,
  ...restProps
}) => {
  const linkClassName = useComponentStyles('link', {
    root: true,
    variants: { variant, underline },
  });

  return (
    <Template
      asChild={asChild}
      ref={ref}
      className={classnames(className, linkClassName)}
      {...restProps}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
