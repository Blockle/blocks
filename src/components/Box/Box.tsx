import type { ForwardRefComponent } from '@radix-ui/react-polymorphic';
import { forwardRef } from 'react';
import { Atoms } from '../../lib/css/atoms';
import { atoms } from '../../lib/css/atoms/sprinkles.css';
import { classnames } from '../../lib/utils/classnames';

const defaultElement = 'div';

export type BoxProps = {
  children?: React.ReactNode;
  className?: string;
} & Atoms;

type PolymorphicBox = ForwardRefComponent<'div', BoxProps>;

export const Box = forwardRef(function Box({ className, as, ...restProps }, ref) {
  const Component = as || defaultElement;
  const atomProps: Record<string, unknown> = {};
  const otherProps: Record<string, unknown> = {};

  for (const [name, value] of Object.entries(restProps)) {
    if ((atoms.properties as Set<string>).has(name)) {
      atomProps[name] = value;
    } else {
      otherProps[name] = value;
    }
  }

  return (
    <Component ref={ref} className={classnames(className, atoms(atomProps))} {...otherProps} />
  );
}) as PolymorphicBox;
