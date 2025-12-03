'use client';

import { classnames } from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';

export type ProgressProps = {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-valuetext'?: string;
  className?: string;
  indeterminate?: boolean;
  // TODO - add support for min
  max?: number;
  style?: React.CSSProperties;
  /**
   * The value of the progress bar, between 0 and max=100.
   */
  value?: number;
  ref?: React.Ref<HTMLDivElement>;
};

export const Progress: React.FC<ProgressProps> = ({
  className,
  indeterminate,
  max = 100,
  ref,
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
      ref={ref}
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
