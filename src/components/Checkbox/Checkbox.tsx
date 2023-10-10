import { forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import * as styles from './checkbox.css';

export type CheckboxProps = { name: string } & HTMLElementProps<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { name, className, ...restProps },
  ref,
) {
  const containerClassName = useComponentStyles('checkbox', { base: true }, false);
  const iconClassName = useComponentStyles('checkbox', { icon: true }, false);

  return (
    <div className={classnames(styles.container, containerClassName, className)}>
      <input ref={ref} type="checkbox" name={name} className={styles.input} {...restProps} />
      <div className={classnames(styles.icon, iconClassName)} />
    </div>
  );
});
