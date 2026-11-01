'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { useEffect, useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { getPanelId, getTabId, useTabsContext } from './TabsContext.js';

export type TabProps = {
  children?: React.ReactNode;
  /** Content after the tab, such as a close `IconButton`; never inside the tab itself */
  endSlot?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  /** Content before the tab, such as a status dot or an Icon */
  startSlot?: React.ReactNode;
  /** Matches the `value` of the TabPanel this tab shows */
  value: string;
} & Omit<
  HTMLElementProps<HTMLButtonElement>,
  'children' | 'ref' | 'type' | 'value'
>;

function hasContent(node: React.ReactNode) {
  return node !== null && node !== undefined && node !== false;
}

// Scrolls the tab list sideways just far enough to show the tab. Done by hand
// rather than with scrollIntoView, which would scroll the page vertically too.
function revealInline(tab: HTMLElement) {
  const list = tab.closest<HTMLElement>('[role="tablist"]');

  if (!list) {
    return;
  }

  const tabBox = tab.getBoundingClientRect();
  const listBox = list.getBoundingClientRect();

  if (tabBox.left < listBox.left) {
    list.scrollLeft -= listBox.left - tabBox.left;
  } else if (tabBox.right > listBox.right) {
    list.scrollLeft += tabBox.right - listBox.right;
  }
}

export const Tab: React.FC<TabProps> = ({
  children,
  className,
  endSlot,
  onClick,
  startSlot,
  value,
  ...restProps
}) => {
  const { baseId, setValue, value: selectedValue } = useTabsContext('Tab');
  const selected = selectedValue === value;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && wrapperRef.current) {
      revealInline(wrapperRef.current);
    }
  }, [selected]);
  // The wrapper holds the activation element and, later, its Slots; the Tab
  // indicator anchors to it
  const tabClassName = useComponentStyles('tabs', { tab: true });
  const triggerClassName = useComponentStyles('tabs', { trigger: true });

  const startSlotClassName = useComponentStyles(
    'tabs',
    { startSlot: true },
    false,
  );
  const endSlotClassName = useComponentStyles('tabs', { endSlot: true }, false);

  return (
    <div ref={wrapperRef} className={tabClassName}>
      {hasContent(startSlot) && (
        <span className={startSlotClassName}>{startSlot}</span>
      )}
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
      {hasContent(endSlot) && (
        <span className={endSlotClassName}>{endSlot}</span>
      )}
    </div>
  );
};
