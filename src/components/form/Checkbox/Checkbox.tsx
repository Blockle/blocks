import type React from 'react';
import { useId } from 'react';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import type { HTMLElementProps } from '../../../lib/utils/utils';
import { Label } from '../Label/Label';
import * as styles from './checkbox.css';

export type CheckboxProps = {
  children?: React.ReactNode;
  name: string;
  ref?: React.Ref<HTMLInputElement>;
  required?: boolean;
} & HTMLElementProps<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className,
  id,
  name,
  ref,
  required,
  ...restProps
}) => {
  const containerClassName = getComponentStyles(
    'checkbox',
    { base: true },
    false,
  );
  const iconClassName = getComponentStyles('checkbox', { icon: true }, false);
  const labelClassName = getComponentStyles('checkbox', { label: true }, false);
  const reactId = useId();
  const inputId = id || reactId;

  const input = (
    <div
      className={classnames(styles.container, containerClassName, className)}
    >
      <input
        ref={ref}
        type="checkbox"
        name={name}
        id={inputId}
        className={styles.input}
        {...restProps}
      />
      <div className={classnames(styles.icon, iconClassName)} aria-hidden>
        <DefaultIcon />
      </div>
    </div>
  );

  if (!children) {
    return input;
  }

  return (
    <span className={labelClassName}>
      {input}
      {children && (
        <Label required={required} htmlFor={inputId}>
          {children}
        </Label>
      )}
    </span>
  );
};

// Icon from https://heroicons.com/
const DefaultIcon: React.FC = () => {
  return (
    // TOOD - replace with actual icon component renderer
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      style={{ width: '1rem', height: '1rem', display: 'block' }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
};
