'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './select.css.js';

type SelectTheme = ComponentThemes['select'];

export type SelectProps = {
  children: React.ReactNode;
  placeholder?: string;
  ref?: React.Ref<HTMLSelectElement>;
  variant?: SelectTheme['variants']['variant'];
} & HTMLElementProps<HTMLSelectElement>;

export const Select: React.FC<SelectProps> = ({
  children,
  placeholder,
  className,
  variant,
  ref,
  ...restProps
}) => {
  const wrapperClassName = useComponentStyles('select', { base: true }, false);
  const selectClassName = useComponentStyles('select', {
    select: true,
    variants: { variant },
  });
  const iconClassName = useComponentStyles('select', { icon: true }, false);

  return (
    <Box className={classnames(styles.wrapper, wrapperClassName)}>
      <select
        ref={ref}
        className={classnames(styles.select, selectClassName, className)}
        {...restProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <Box
        className={classnames(styles.icon, iconClassName)}
        role="presentation"
        aria-hidden
      >
        <DefaultIcon />
      </Box>
    </Box>
  );
};

const DefaultIcon: React.FC = () => {
  return (
    // TOOD - replace with actual icon component renderer
    <svg
      role="presentation"
      viewBox="0 0 24 24"
      style={{ width: '1rem', height: '1rem' }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m11.625 14.3666 7.9365-7.653c.5241-.5055 1.3133-.4372 1.7625.1525.4493.5897.3886 1.4774-.1355 1.9829l-8.75 8.4375c-.4681.4513-1.1589.4513-1.627 0l-8.75-8.4375c-.5241-.5055-.5848-1.3932-.1356-1.9829.4493-.5897 1.2385-.658 1.7626-.1525l7.9365 7.653Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
