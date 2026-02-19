'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';

export type ProgressProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-valuetext'?: string;
  indeterminate?: boolean;
  // TODO - add support for min
  max?: number;
  /**
   * The value of the progress bar, between 0 and max=100.
   */
  value?: number;
} & Omit<
  HTMLElementProps<HTMLDivElement>,
  // Set by the component
  'role' | 'aria-valuenow' | 'aria-valuemin' | 'aria-valuemax'
>;

export const Progress: React.FC<ProgressProps> = ({
  className,
  indeterminate,
  max = 100,
  value = 0,
  ...restProps
}) => {
  const progress = (value / max) * 100;
  const containerClassName = useComponentStyles(
    'progress',
    {
      root: true,
    },
    false,
  );
  const barClassName = useComponentStyles(
    'progress',
    { bar: true, variants: { indeterminate } },
    false,
  );

  return (
    <Box
      className={classnames(containerClassName, className)}
      overflow="hidden"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...restProps}
    >
      <Box
        className={barClassName}
        backgroundColor="currentColor"
        inlineSize="full"
        blockSize="full"
        style={{
          transform: indeterminate
            ? undefined
            : `translateX(-${100 - progress}%)`,
        }}
      />
    </Box>
  );
};
