import React, { forwardRef } from 'react';
import { useComponentStyles } from '../../hooks/useComponentStyles';
import { classnames } from '../../lib/utils/classnames';
import { HTMLElementProps } from '../../lib/utils/utils';
import { Label } from '../Label/Label';
import * as styles from './checkbox.css';

export type CheckboxProps = {
  name: string;
  label?: React.ReactNode;
  required?: boolean;
} & HTMLElementProps<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { name, label, required, className, ...restProps },
  ref,
) {
  const containerClassName = useComponentStyles('checkbox', { base: true }, false);
  const iconClassName = useComponentStyles('checkbox', { icon: true }, false);
  const labelClassName = useComponentStyles('checkbox', { label: true }, false);

  const input = (
    <div className={classnames(styles.container, containerClassName, className)}>
      <input ref={ref} type="checkbox" name={name} className={styles.input} {...restProps} />
      <div className={classnames(styles.icon, iconClassName)} />
    </div>
  );

  if (!label) {
    return input;
  }

  return (
    <label className={labelClassName}>
      {input}
      {label && (
        <Label visualOnly required={required}>
          {label}
        </Label>
      )}
    </label>
  );
});
