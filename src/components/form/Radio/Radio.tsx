import { forwardRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Label } from '../Label/Label';
import * as styles from './radio.css';

export type RadioProps = {
  name: string;
  value: string;
  label?: React.ReactNode;
} & HTMLElementProps<HTMLInputElement>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Checkbox(
  { name, label, className, ...restProps },
  ref,
) {
  const containerClassName = useComponentStyles('radio', { base: true }, false);
  const iconClassName = useComponentStyles('radio', { icon: true }, false);
  const labelClassName = useComponentStyles('checkbox', { label: true }, false);

  const input = (
    <div className={classnames(styles.container, containerClassName, className)}>
      <input ref={ref} type="radio" name={name} className={styles.input} {...restProps} />
      <div className={classnames(styles.icon, iconClassName)} />
    </div>
  );

  if (!label) {
    return input;
  }

  return (
    <label className={labelClassName}>
      {input}
      {label && <Label visualOnly>{label}</Label>}
    </label>
  );
});
