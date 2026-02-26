import {
  type Atoms,
  atoms,
  type ComponentThemes,
  classnames,
  getAtomsAndProps,
  type HTMLElementProps,
  type MarginAtoms,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './IconMask.css.js';

type IconTheme = ComponentThemes['icon'];

export type IconMaskProps = {
  color?: Atoms['color'];
  display?: Atoms['display'];
  size?: IconTheme['variants']['size'];
  src: string;
} & MarginAtoms &
  Omit<HTMLElementProps<HTMLSpanElement>, 'color' | 'display' | 'size'>;

export const IconMask: React.FC<IconMaskProps> = ({
  className,
  color = 'currentColor',
  src,
  size,
  style,
  display = 'block',
  ...restProps
}) => {
  const [atomsProps, otherProps] = getAtomsAndProps(restProps);
  const iconClassName = useComponentStyles('icon', {
    variants: { size },
  });

  return (
    <span
      role="presentation"
      className={classnames(
        atoms({ color, display, ...atomsProps }),
        styles.iconMask,
        iconClassName,
        className,
      )}
      style={{
        maskImage: `url(${src})`,
        ...style,
      }}
      {...otherProps}
    />
  );
};
