import { forwardRef } from 'react';
import { atoms } from '../../lib/css/atoms';
import { Atoms } from '../../lib/css/atoms/atomTypes';
import { getAtomsAndProps } from '../../lib/utils/atom-props';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { createSlottable } from '../Slot/Slot';

export type BoxProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
} & Atoms &
  HTMLElementProps<HTMLDivElement>;

const Slottable = createSlottable('div');

export const Box = forwardRef<any, BoxProps>(function Box(
  { asChild, className, children, ...restProps },
  ref,
) {
  const [atomsProps, otherProps] = getAtomsAndProps(restProps);

  return (
    <Slottable
      ref={ref}
      asChild={asChild}
      className={classnames(className, atoms(atomsProps))}
      {...otherProps}
    >
      {children}
    </Slottable>
  );
});
