'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { getPanelId, getTabId, useTabsContext } from './TabsContext.js';

export type TabPanelProps = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
  /** Matches the `value` of the Tab that shows this panel */
  value: string;
} & Omit<HTMLElementProps<HTMLDivElement>, 'children' | 'ref' | 'value'>;

/**
 * Stays mounted while inactive, hidden with the `hidden` attribute, so its
 * state (such as a typed draft) survives switching tabs. Render its children
 * conditionally to mount them only while selected.
 */
export const TabPanel: React.FC<TabPanelProps> = ({
  children,
  className,
  value,
  ...restProps
}) => {
  const { baseId, value: selectedValue } = useTabsContext('TabPanel');
  const selected = selectedValue === value;
  const panelClassName = useComponentStyles('tabs', 'panel');

  return (
    <div
      role="tabpanel"
      id={getPanelId(baseId, value)}
      aria-labelledby={getTabId(baseId, value)}
      hidden={!selected}
      tabIndex={selected ? 0 : undefined}
      className={classnames(panelClassName, className)}
      {...restProps}
    >
      {children}
    </div>
  );
};
