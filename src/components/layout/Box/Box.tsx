import { forwardRef } from 'react';
import { createAsChildContainer } from '../../../lib/asChildRenderer/asChildRender';
import { atoms } from '../../../lib/css/atoms';
import { Atoms } from '../../../lib/css/atoms/atomTypes';
import { getAtomsAndProps } from '../../../lib/utils/atom-props';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';

export type BoxProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
} & Atoms &
  HTMLElementProps<HTMLDivElement>;

const { Template, Slot } = createAsChildContainer({ defaultElement: 'div' });

export const Box = forwardRef<unknown, BoxProps>(function Box(
  { asChild, className, children, ...restProps },
  ref,
) {
  const [atomsProps, otherProps] = getAtomsAndProps(restProps);

  return (
    <Template
      ref={ref as React.RefObject<HTMLDivElement>}
      asChild={asChild}
      className={classnames(className, atoms(atomsProps))}
      {...otherProps}
    >
      <Slot>{children}</Slot>
    </Template>
  );
});
