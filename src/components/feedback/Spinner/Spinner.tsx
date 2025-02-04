import type { MarginAtoms } from '../../../lib/css/atoms';
import type { SpinnerTheme } from '../../../lib/theme/componentThemes';
import { getComponentStyles } from '../../../lib/theme/store/theme';
import { classnames } from '../../../lib/utils/classnames';
import { Box } from '../../layout/Box';

export type SpinnerProps = {
  className?: string;
  color?: SpinnerTheme['variants']['color'];
  size?: SpinnerTheme['variants']['size'];
  style?: React.CSSProperties;
} & MarginAtoms;

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  color,
  ...restProps
}) => {
  const spinnerClassName = getComponentStyles('spinner', {
    base: true,
    variants: { size, color },
  });

  return (
    <Box
      color={color}
      className={classnames(spinnerClassName, className)}
      {...restProps}
    />
  );
};
