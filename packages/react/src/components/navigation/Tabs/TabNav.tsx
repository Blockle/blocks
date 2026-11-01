'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { TabNavContext } from './TabNavContext.js';

export type TabNavProps = {
  /** Names the navigation; use it or `aria-labelledby` when a page has several */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  /** `Tab`s, each a link; mark the current page's with `current` */
  children?: React.ReactNode;
  ref?: React.Ref<HTMLElement>;
} & Omit<HTMLElementProps<HTMLElement>, 'children' | 'ref'>;

/**
 * Route tabs: a `nav` around a list of links that looks like `Tabs`. It has no
 * tab roles or arrow-key handling; the links are plain links in the tab order.
 */
export const TabNav: React.FC<TabNavProps> = ({
  children,
  className,
  ref,
  ...restProps
}) => {
  const listClassName = useComponentStyles('tabs', { list: true });
  const navListClassName = useComponentStyles('tabs', { navList: true });
  const indicatorClassName = useComponentStyles('tabs', { indicator: true });

  return (
    <TabNavContext.Provider value={true}>
      <nav
        ref={ref}
        className={classnames(listClassName, className)}
        {...restProps}
      >
        <ul className={navListClassName}>{children}</ul>
        <span
          aria-hidden="true"
          data-tab-indicator=""
          className={indicatorClassName}
        />
      </nav>
    </TabNavContext.Provider>
  );
};
