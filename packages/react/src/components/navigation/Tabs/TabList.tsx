'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { getTabValue, useTabsContext } from './TabsContext.js';

export type TabListProps = {
  /** Names the tab list; use it or `aria-labelledby` when a page has several */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
} & Omit<HTMLElementProps<HTMLDivElement>, 'children' | 'ref'>;

export const TabList: React.FC<TabListProps> = ({
  children,
  className,
  onKeyDown,
  ref,
  ...restProps
}) => {
  const { baseId, setValue } = useTabsContext('TabList');
  const listRef = useRef<HTMLDivElement | null>(null);
  const listClassName = useComponentStyles('tabs', { list: true });

  return (
    <div
      role="tablist"
      ref={(node) => {
        listRef.current = node;

        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={classnames(listClassName, className)}
      onKeyDown={(event) => {
        onKeyDown?.(event);

        if (event.defaultPrevented || !listRef.current) {
          return;
        }

        // Read the tabs from the DOM so tabs added or removed at runtime
        // need no registration
        const tabs = Array.from(
          listRef.current.querySelectorAll<HTMLElement>('[role="tab"]'),
        );
        const index = tabs.indexOf(event.target as HTMLElement);

        if (index === -1) {
          return;
        }

        const nextIndex = getNextIndex(event.key, index, tabs.length);

        if (nextIndex === undefined) {
          return;
        }

        event.preventDefault();

        const next = tabs[nextIndex];

        if (!next) {
          return;
        }

        const nextValue = getTabValue(baseId, next.id);

        next.focus();

        if (nextValue !== undefined) {
          setValue(nextValue);
        }
      }}
      {...restProps}
    >
      {children}
    </div>
  );
};

function getNextIndex(key: string, index: number, count: number) {
  switch (key) {
    case 'ArrowRight':
      return (index + 1) % count;
    case 'ArrowLeft':
      return (index - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return undefined;
  }
}
