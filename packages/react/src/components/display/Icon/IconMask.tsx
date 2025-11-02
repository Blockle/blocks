import {
  type Atoms,
  atoms,
  type ComponentThemes,
  classnames,
} from '@blockle/blocks-core';
import type React from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './IconMask.css.js';

type IconTheme = ComponentThemes['icon'];

export type IconMaskProps = {
  className?: string;
  color?: Atoms['color'];
  src: string;
  size?: IconTheme['variants']['size'];
};

export const IconMask: React.FC<IconMaskProps> = ({
  className,
  color = 'currentColor',
  src,
  size,
}) => {
  const iconClassName = useComponentStyles('icon', {
    variants: { size },
  });

  return (
    <span
      role="presentation"
      className={classnames(
        atoms({ color }),
        styles.iconMask,
        iconClassName,
        className,
      )}
      style={{
        mask: `url(${src}) no-repeat center`,
      }}
    />
  );
};
