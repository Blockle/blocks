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
  intent?: LinkTheme['variants']['intent'];
  underline?: LinkTheme['variants']['underline'];
} & HTMLElementProps<HTMLAnchorElement> &
  MarginAtoms;

const [Template, Slot] = createSlottable('a');

export const Link: React.FC<LinkProps> = ({
  asChild,
  children,
  className,
  intent,
  underline,
  ...restProps
}) => {
  const linkClassName = useComponentStyles('link', {
    root: true,
    variants: { intent, underline },
  });

  return (
    <Template
      asChild={asChild}
      className={classnames(className, linkClassName)}
      {...restProps}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
