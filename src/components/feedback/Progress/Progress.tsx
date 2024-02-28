import { forwardRef } from 'react';
import { useComponentStyles } from '../../../hooks/useComponentStyles';
import { classnames } from '../../../lib/utils/classnames';
import { Box } from '../../layout/Box';

export type ProgressProps = {
  /**
   * The value of the progress bar, between 0 and 100.
   * If undefined, the progress bar will be indeterminate.
   */
  value?: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
  'aria-labelledby'?: string;
};

export const Progress = forwardRef<HTMLProgressElement, ProgressProps>(function Progress(
  { value, max = 100, className, ...restProps },
  ref,
) {
  const containerClassName = useComponentStyles(
    'progress',
    {
      base: true,
    },
    false,
  );
  const barClassName = useComponentStyles(
    'progress',
    { bar: true, variants: { indeterminate: value === undefined } },
    false,
  );

  // Calculate the progress as a percentage (0 - 100)
  const progress = value === undefined ? 0 : (value / max) * 100;

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
        className={classnames(barClassName)}
        backgroundColor="currentColor"
        inlineSize="full"
        blockSize="full"
        style={{ transform: value === undefined ? undefined : `translateX(-${100 - progress}%)` }}
      />
    </Box>
  );
});
