import React from 'react';
import { createAsChildTemplate } from '../../../lib/asChildRenderer/createAsChildTemplate';
import { atoms } from '../../../lib/css/atoms';
import { Atoms } from '../../../lib/css/atoms/atomTypes';
import { getAtomsAndProps } from '../../../lib/utils/atom-props';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';

export type BoxProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
} & Atoms &
  HTMLElementProps<HTMLDivElement>;

const { Template, Slot } = createAsChildTemplate('div');

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
      {...otherProps}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
