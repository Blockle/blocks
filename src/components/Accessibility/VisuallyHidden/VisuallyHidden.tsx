import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import * as styles from './visually-hidden.css';

export type VisuallyHiddenProps = {
  children: React.ReactNode;
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
