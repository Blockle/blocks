'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { getPanelId, getTabId, useTabsContext } from './TabsContext.js';

export type TabProps = {
  children?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  /** Matches the `value` of the TabPanel this tab shows */
  value: string;
} & Omit<
  HTMLElementProps<HTMLButtonElement>,
  'children' | 'ref' | 'type' | 'value'
>;

export const Tab: React.FC<TabProps> = ({
  children,
  className,
  onClick,
  value,
  ...restProps
}) => {
  const { baseId, setValue, value: selectedValue } = useTabsContext('Tab');
  const selected = selectedValue === value;
  // The wrapper holds the activation element and, later, its Slots; the Tab
  // indicator anchors to it
  const tabClassName = useComponentStyles('tabs', { tab: true });
  const triggerClassName = useComponentStyles('tabs', { trigger: true });

  return (
    <div className={tabClassName}>
      <button
        type="button"
        role="tab"
        id={getTabId(baseId, value)}
        aria-selected={selected}
        aria-controls={getPanelId(baseId, value)}
        tabIndex={selected ? 0 : -1}
        className={classnames(triggerClassName, className)}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setValue(value);
          }
        }}
        {...restProps}
      >
        {children}
      </button>
    </div>
  );
};
