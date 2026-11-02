'use client';

import { classnames } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import * as styles from './tabs.css.js';

/**
 * The Tab indicator: one decorative bar per list, positioned by the base styles
 * against the selected tab and styled by the theme. Shared by `TabList` and `TabNav`.
 */
export const TabIndicator: React.FC = () => {
  const className = useComponentStyles('tabs', 'indicator');

  return (
    <span
      aria-hidden="true"
      data-tab-indicator=""
      className={classnames(styles.indicator, className)}
    />
  );
};
