import {
  type HTMLElementProps,
  type Sprinkles,
  classnames,
  splitSpinklesAndComponentProps,
  sprinkles,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-slot';

export type BoxProps = {
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
} & Sprinkles &
  HTMLElementProps<HTMLDivElement>;

const { Template, Slot } = createSlottable('div');

export const Box: React.FC<BoxProps> = ({
  asChild,
  className,
  children,
  ref,
  ...restProps
}) => {
  const [atomsProps, otherProps] = splitSpinklesAndComponentProps(restProps);

  return (
    <Template
      ref={ref}
      asChild={asChild}
      className={classnames(className, sprinkles(atomsProps))}
      {...otherProps}
    >
      <Slot>{children}</Slot>
    </Template>
  );
};
