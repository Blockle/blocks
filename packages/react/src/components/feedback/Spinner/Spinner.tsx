'use client';

import {
  type ComponentThemes,
  type MarginAtoms,
  classnames,
} from '@blockle/blocks-core';
import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';

import { Box } from '../../layout/Box/Box.js';

type SpinnerTheme = ComponentThemes['spinner'];

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
  const spinnerClassName = useComponentStyles('spinner', {
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
