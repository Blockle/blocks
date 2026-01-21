'use client';

import {
  type Atoms,
  type ComponentThemes,
  classnames,
  vars,
} from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { Box } from '../../layout/Box/Box.js';
import * as styles from './divider.css.js';

function getVanillaVarName(variable: string | undefined) {
  return (variable ?? '').replace(/var\((.+)\)/, '$1');
}

const dividerColorVarName = getVanillaVarName(styles.dividerColorVar);

export type DividerProps = {
  alignment?: 'start' | 'center' | 'end';
  className?: string;
  color?: keyof typeof vars.color;
  children?: React.ReactNode;
  size?: ComponentThemes['divider']['variants']['size'];
  style?: React.CSSProperties;
  gap?: Atoms['gap'];
};

export const Divider: React.FC<DividerProps> = ({
  alignment = 'center',
  className,
  color,
  children,
  size,
  gap = 2,
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
        [dividerColorVarName]: color ? vars.color[color] : 'currentColor',
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
