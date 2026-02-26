'use client';

import {
  type Atoms,
  type ComponentThemes,
  classnames,
  getNameFromVanillaCSSVar,
  type HTMLElementProps,
  vars,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './divider.css.js';

export type DividerProps = {
  alignment?: 'start' | 'center' | 'end';
  color?: keyof typeof vars.color;
  size?: ComponentThemes['divider']['variants']['size'];
  gap?: Atoms['gap'];
} & Omit<HTMLElementProps<HTMLDivElement>, 'size'>;

export const Divider: React.FC<DividerProps> = ({
  alignment = 'center',
  className,
  color,
  children,
  size,
  gap = 2,
  style,
  ...restProps
}) => {
  const dividerClass = useComponentStyles('divider', {
    root: true,
    variants: { size },
  });

  return (
    <Box
      role="separator"
      aria-orientation="horizontal"
      inlineSize="full"
      gap={gap}
      className={classnames(className, dividerClass, styles.divider)}
      data-alignment={alignment}
      style={{
        ...style,
        [getNameFromVanillaCSSVar(styles.dividerColorVar)]: color
          ? vars.color[color]
          : 'currentColor',
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
