import {
  type Atoms,
  atoms,
  classnames,
  getAtomsAndProps,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import type React from 'react';

export type BoxProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
} & Atoms &
  HTMLElementProps<HTMLDivElement>;

const [Template] = createSlottable('div');

export const Box: React.FC<BoxProps> = ({
  asChild,
  className,
  children,
  ref,
  ...restProps
}) => {
  const [atomsProps, otherProps] = getAtomsAndProps(restProps);

  return (
    <Template
      ref={ref}
      asChild={asChild}
      className={classnames(className, atoms(atomsProps))}
      noSlot
      {...otherProps}
    >
      {children}
    </Template>
  );
};
