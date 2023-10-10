import { forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import * as styles from './radio.css';

export type RadioProps = { name: string; value: string } & HTMLElementProps<HTMLInputElement>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Checkbox(
  { name, className, ...restProps },
  ref,
) {
  const containerClassName = useComponentStyles('radio', { base: true }, false);
  const iconClassName = useComponentStyles('radio', { icon: true }, false);

  return (
    <div className={classnames(styles.container, containerClassName, className)}>
      <input ref={ref} type="radio" name={name} className={styles.input} {...restProps} />
      <div className={classnames(styles.icon, iconClassName)} />
    </div>
  );
});
