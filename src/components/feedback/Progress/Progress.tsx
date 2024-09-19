import { forwardRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { classnames } from '../../../lib/utils/classnames';
import { Box } from '../../layout/Box';

export type ProgressProps = {
  'aria-labelledby'?: string;
  className?: string;
  indeterminate?: boolean;
  max?: number;
  style?: React.CSSProperties;
  /**
   * The value of the progress bar, between 0 and max=100.
   */
  value?: number;
};

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(function Progress(
  { className, indeterminate, max = 100, value = 0, ...restProps },
  ref,
) {
  const progress = (value / max) * 100;
  const containerClassName = useComponentStyles(
    'progress',
    {
      base: true,
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
        style={{ transform: indeterminate ? undefined : `translateX(-${100 - progress}%)` }}
      />
    </Box>
  );
});
