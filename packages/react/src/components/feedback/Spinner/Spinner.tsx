'use client';

import {
  type ComponentThemes,
  classnames,
  type HTMLElementProps,
  type MarginAtoms,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';

type SpinnerTheme = ComponentThemes['spinner'];

export type SpinnerProps = {
  color?: SpinnerTheme['variants']['color'];
  size?: SpinnerTheme['variants']['size'];
} & HTMLElementProps<HTMLDivElement> &
  MarginAtoms;

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size,
  color,
  ...restProps
}) => {
  const spinnerClassName = useComponentStyles('spinner', {
    root: true,
    variants: { size, color },
  });

  return (
    <Box
      data-testid="blocks-spinner"
      color={color}
      className={classnames(spinnerClassName, className)}
      {...restProps}
    />
  );
};
