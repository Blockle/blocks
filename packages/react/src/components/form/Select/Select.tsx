'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { ChevronDownIcon } from '../../../icons/icons.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './select.css.js';

type SelectTheme = ComponentThemes['select'];

export type SelectProps = {
  children: React.ReactNode;
  placeholder?: string;
  size?: SelectTheme['variants']['size'];
  variant?: SelectTheme['variants']['variant'];
} & Omit<HTMLElementProps<HTMLSelectElement>, 'size'>;

export const Select: React.FC<SelectProps> = ({
  children,
  placeholder,
  className,
  size,
  variant,
  ...restProps
}) => {
  const wrapperClassName = useComponentStyles('select', { root: true }, false);
  const selectClassName = useComponentStyles('select', {
    select: true,
    variants: { variant, size },
  });
  const iconClassName = useComponentStyles('select', { icon: true }, false);

  return (
    <Box className={classnames(styles.wrapper, wrapperClassName)}>
      <select
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
        <ChevronDownIcon style={{ width: '1rem', height: '1rem' }} />
      </Box>
    </Box>
  );
};
