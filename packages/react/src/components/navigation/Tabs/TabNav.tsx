'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { useMemo, useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { TabIndicator } from './TabIndicator.js';
import { TabListContext } from './TabListContext.js';
import * as styles from './tabs.css.js';

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
  const navRef = useRef<HTMLElement | null>(null);
  const listClassName = useComponentStyles('tabs', 'list');
  const navListClassName = useComponentStyles('tabs', 'navList');

  const context = useMemo(
    () => ({ fallbackValue: undefined, nav: true, scrollRef: navRef }),
    [],
  );

  return (
    <TabListContext.Provider value={context}>
      <nav
        ref={(node) => {
          navRef.current = node;

          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={classnames(styles.list, listClassName, className)}
        {...restProps}
      >
        <ul className={classnames(styles.navList, navListClassName)}>
          {children}
        </ul>
        <TabIndicator />
      </nav>
    </TabListContext.Provider>
  );
};
