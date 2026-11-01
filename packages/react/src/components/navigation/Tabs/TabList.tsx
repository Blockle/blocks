'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';

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
  ...restProps
}) => {
  const listClassName = useComponentStyles('tabs', { list: true });
  const indicatorClassName = useComponentStyles('tabs', { indicator: true });

  return (
    <div
      role="tablist"
      className={classnames(listClassName, className)}
      {...restProps}
    >
      {children}
      <span
        aria-hidden="true"
        data-tab-indicator=""
        className={indicatorClassName}
      />
    </div>
  );
};
