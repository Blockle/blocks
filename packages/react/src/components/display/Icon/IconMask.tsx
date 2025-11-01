import { type Atoms, atoms, classnames } from '@blockle/blocks-core';
import type React from 'react';

import * as styles from './IconMask.css.js';

export type IconMaskProps = {
  className?: string;
  color?: Atoms['color'];
  src: string;
  // size: Theme..
};

/**
 * Render an icon using CSS masking without inlining SVGs.
 *
 * Limitations
 * - Only works with monochrome icons (SVGs with a single color)
 *
 * Example usage:
 * ```tsx
 * import { Icon } from '@blockle/blocks-react';
 *
 * const getIconUrl = (name: 'cross' | 'check') => `/icons/${name}.svg`;
 * <IconMask getUrl={getIconUrl} name="cross" /> // could infer with typescript
 *
 * // or change to
 * <IconMask src={getIconUrl('cross')} />
 * const Icon = createIconMask(getIconUrl);
 * ```
 */
export const IconMask: React.FC<IconMaskProps> = ({
  className,
  color = 'currentColor',
  src,
  // getIconUrl,
  // name,
}) => {
  return (
    <span
      role="presentation"
      className={classnames(atoms({ color }), styles.iconMask, className)}
      style={{
        mask: `url(${src}) no-repeat center`,
        width: '2rem',
      }}
    />
  );
};

type CreateIconMaskProps<TName extends string> = Omit<IconMaskProps, 'src'> & {
  name: TName;
};

export const createIconMask = <TName extends string>(
  getIconUrl: (name: TName) => string,
) => {
  return ({ name, ...props }: CreateIconMaskProps<TName>) => {
    return <IconMask {...props} src={getIconUrl(name)} />;
  };
};

export const MyIcon = createIconMask(
  (name: 'cross' | 'check') => `/icons/${name}.svg`,
);

const lel = <MyIcon name="cross" />;
