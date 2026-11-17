'use client';

import { classnames } from '@blockle/blocks-core';
import { useContext } from 'react';

import {
  type BlocksIcons,
  BlocksProviderContext,
} from '../components/providers/BlocksProvider/context.js';
import * as styles from './BuiltInIcon.css.js';
import { defaultIcons } from './defaultIcons.js';

/**
 * Reads an icon of the Icon set from the nearest BlocksProvider, falling back
 * to Blocks' own. Internal: consumers import their own icons.
 */
function useBuiltInIcon(name: keyof BlocksIcons): React.ReactNode {
  const context = useContext(BlocksProviderContext);

  return context?.icons[name] ?? defaultIcons[name];
}

type BuiltInIconProps = {
  name: keyof BlocksIcons;
  className?: string;
};

/**
 * Renders an icon of the Icon set in a decorative wrapper that sizes it.
 * `data-blocks-icon` lets a theme size it where it sits, as in an IconButton.
 */
export const BuiltInIcon: React.FC<BuiltInIconProps> = ({
  name,
  className,
}) => {
  const icon = useBuiltInIcon(name);

  return (
    <span
      className={classnames(styles.builtInIcon, className)}
      data-blocks-icon={name}
      aria-hidden="true"
    >
      {icon}
    </span>
  );
};
