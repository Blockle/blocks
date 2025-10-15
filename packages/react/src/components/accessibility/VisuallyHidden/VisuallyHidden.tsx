import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import * as styles from './visually-hidden.css.js';

export type VisuallyHiddenProps = {
  children: React.ReactNode;
  asChild?: boolean;
} & HTMLElementProps<HTMLSpanElement>;

export const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <span
      className={classnames(styles.visuallyHidden, className)}
      {...restProps}
    >
      {children}
    </span>
  );
};
