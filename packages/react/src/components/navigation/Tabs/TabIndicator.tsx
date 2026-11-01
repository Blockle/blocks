'use client';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';

/**
 * The Tab indicator: one decorative bar per list, positioned by the theme
 * against the selected tab. Shared by `TabList` and `TabNav`.
 */
export const TabIndicator: React.FC = () => {
  const className = useComponentStyles('tabs', { indicator: true });

  return (
    <span aria-hidden="true" data-tab-indicator="" className={className} />
  );
};
