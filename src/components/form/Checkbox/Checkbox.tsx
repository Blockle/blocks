import React, { forwardRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { classnames } from '../../../lib/utils/classnames';
import { HTMLElementProps } from '../../../lib/utils/utils';
import { Label } from '../Label/Label';
import * as styles from './checkbox.css';

export type CheckboxProps = {
  name: string;
  children?: React.ReactNode;
  required?: boolean;
} & HTMLElementProps<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { name, children, required, className, ...restProps },
  ref,
) {
  const containerClassName = useComponentStyles('checkbox', { base: true }, false);
  const iconClassName = useComponentStyles('checkbox', { icon: true }, false);
  const labelClassName = useComponentStyles('checkbox', { label: true }, false);

  const input = (
    <div className={classnames(styles.container, containerClassName, className)}>
      <input ref={ref} type="checkbox" name={name} className={styles.input} {...restProps} />
      <div className={classnames(styles.icon, iconClassName)} role="presentation" aria-hidden>
        <DefaultIcon />
      </div>
    </div>
  );

  if (!children) {
    return input;
  }

  return (
    <label className={labelClassName}>
      {input}
      {children && (
        <Label asSpan required={required}>
          {children}
        </Label>
      )}
    </label>
  );
});

// Icon from https://heroicons.com/
const DefaultIcon: React.FC = () => {
  return (
    // TOOD - replace with actual icon component renderer
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{ width: '1rem', height: '1rem', display: 'block' }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
};
