import {
  type Atoms,
  atoms,
  type ComponentThemes,
  classnames,
  getAtomsAndProps,
  type MarginAtoms,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './IconMask.css.js';

type IconTheme = ComponentThemes['icon'];

export type IconMaskProps = {
  className?: string;
  color?: Atoms['color'];
  display?: Atoms['display'];
  size?: IconTheme['variants']['size'];
  src: string;
  style?: React.CSSProperties;
} & MarginAtoms;

export const IconMask: React.FC<IconMaskProps> = ({
  className,
  color = 'currentColor',
  src,
  size,
  style,
  display = 'inline-block',
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
        atoms({ color, ...atomsProps }),
        styles.iconMask,
        iconClassName,
        className,
      )}
      style={{
        mask: `url(${src}) no-repeat center`,
        ...style,
      }}
      {...otherProps}
    />
  );
};
