'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import type React from 'react';
import { useId } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { CheckIcon } from '../../../icons/icons.js';
import { Label } from '../Label/Label.js';
import * as styles from './checkbox.css.js';

export type CheckboxProps = {
  children?: React.ReactNode;
  required?: boolean;
} & HTMLElementProps<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({
  children,
  className,
  id,
  required,
  ...restProps
}) => {
  const containerClassName = useComponentStyles(
    'checkbox',
    { root: true },
    false,
  );
  const iconClassName = useComponentStyles('checkbox', { icon: true }, false);
  const labelClassName = useComponentStyles('checkbox', { label: true }, false);
  const reactId = useId();
  const inputId = id || reactId;

  const input = (
    <div
      className={classnames(styles.container, containerClassName, className)}
    >
      <input
        type="checkbox"
        id={inputId}
        className={styles.input}
        {...restProps}
      />
      <div className={classnames(styles.icon, iconClassName)} aria-hidden>
        <CheckIcon
          style={{ width: '1rem', height: '1rem', display: 'block' }}
        />
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
