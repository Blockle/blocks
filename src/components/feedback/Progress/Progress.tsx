import type React from 'react';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import { Box } from '../../layout/Box';

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
  const containerClassName = getComponentStyles(
    'progress',
    {
      base: true,
    },
    false,
  );
  const barClassName = getComponentStyles(
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
