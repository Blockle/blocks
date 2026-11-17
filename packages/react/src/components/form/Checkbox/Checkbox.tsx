'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import type React from 'react';
import { useId } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { BuiltInIcon } from '../../../icons/BuiltInIcon.js';
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
  const containerClassName = useComponentStyles('checkbox', 'root');
  const iconClassName = useComponentStyles('checkbox', 'icon');
  const labelClassName = useComponentStyles('checkbox', 'label');
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
      <BuiltInIcon
        name="check"
        className={classnames(styles.icon, iconClassName)}
      />
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
