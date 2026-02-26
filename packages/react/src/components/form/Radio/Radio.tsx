'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { useId } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Label } from '../Label/Label.js';
import * as styles from './radio.css.js';

export type RadioProps = {
  children?: React.ReactNode;
  name: string;
  value: string;
} & HTMLElementProps<HTMLInputElement>;

export const Radio: React.FC<RadioProps> = ({
  name,
  children,
  className,
  ...restProps
}) => {
  const rid = useId();
  const id = restProps.id ?? rid;
  const containerClassName = useComponentStyles('radio', { root: true }, false);
  const iconClassName = useComponentStyles('radio', { icon: true }, false);
  const labelClassName = useComponentStyles('radio', { label: true }, false);

  const input = (
    <div
      className={classnames(styles.container, containerClassName, className)}
    >
      <input
        type="radio"
        name={name}
        id={id}
        className={styles.input}
        {...restProps}
      />
      <div className={classnames(styles.icon, iconClassName)} />
    </div>
  );

  if (!children) {
    return input;
  }

  return (
    <label htmlFor={id} className={labelClassName}>
      {input}
      <Label asSpan>{children}</Label>
    </label>
  );
};
