'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { useContext, useEffect, useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { TabListContext } from './TabListContext.js';
import { getPanelId, getTabId, useTabsContext } from './TabsContext.js';

export type TabProps = {
  /** In a `TabNav`: render the child element (a router link) as the tab's link */
  asChild?: boolean;
  children?: React.ReactNode;
  /** In a `TabNav`: this tab is the current page. Sets `aria-current="page"` */
  current?: boolean;
  /** Content after the tab, such as a close `IconButton`; never inside the tab itself */
  endSlot?: React.ReactNode;
  ref?: React.Ref<HTMLAnchorElement & HTMLButtonElement>;
  /** Content before the tab, such as a status dot or an Icon */
  startSlot?: React.ReactNode;
  /** In `Tabs`: matches the `value` of the TabPanel this tab shows. Required there. */
  value?: string;
} & Omit<HTMLElementProps<HTMLElement>, 'children' | 'ref' | 'type' | 'value'>;

function hasContent(node: React.ReactNode) {
  return node !== null && node !== undefined && node !== false;
}

// Scrolls the tab list sideways just far enough to show the tab. Done by hand
// rather than with scrollIntoView, which would scroll the page vertically too.
function revealInline(tab: HTMLElement, list: HTMLElement) {
  const tabBox = tab.getBoundingClientRect();
  const listBox = list.getBoundingClientRect();

  if (tabBox.left < listBox.left) {
    list.scrollLeft -= listBox.left - tabBox.left;
  } else if (tabBox.right > listBox.right) {
    list.scrollLeft += tabBox.right - listBox.right;
  }
}

type TabFrameProps = {
  /** Selected (Tabs) or current (TabNav) */
  active: boolean;
  as: 'div' | 'li';
  children: React.ReactNode;
  endSlot: React.ReactNode;
  scrollRef: React.RefObject<HTMLElement | null> | undefined;
  startSlot: React.ReactNode;
};

// The wrapper holds the activation element and its Slots; the Tab indicator
// anchors to it. Shared by both roots so they look the same.
const TabFrame: React.FC<TabFrameProps> = ({
  active,
  as: Wrapper,
  children,
  endSlot,
  scrollRef,
  startSlot,
}) => {
  const wrapperRef = useRef<HTMLDivElement & HTMLLIElement>(null);
  const tabClassName = useComponentStyles('tabs', { tab: true });

  const startSlotClassName = useComponentStyles(
    'tabs',
    { startSlot: true },
    false,
  );
  const endSlotClassName = useComponentStyles('tabs', { endSlot: true }, false);

  useEffect(() => {
    if (active && wrapperRef.current && scrollRef?.current) {
      revealInline(wrapperRef.current, scrollRef.current);
    }
  }, [active, scrollRef]);

  return (
    <Wrapper ref={wrapperRef} className={tabClassName}>
      {hasContent(startSlot) && (
        <span className={startSlotClassName}>{startSlot}</span>
      )}
      {children}
      {hasContent(endSlot) && (
        <span className={endSlotClassName}>{endSlot}</span>
      )}
    </Wrapper>
  );
};

const [LinkTemplate, LinkSlot] = createSlottable('a');

const TabsTab: React.FC<TabProps> = ({
  asChild: _asChild,
  children,
  className,
  current: _current,
  endSlot,
  onClick,
  startSlot,
  value,
  ...restProps
}) => {
  const { baseId, setValue, value: selectedValue } = useTabsContext('Tab');
  const list = useContext(TabListContext);

  const triggerClassName = useComponentStyles('tabs', { trigger: true });

  if (value === undefined) {
    throw new Error('Tab needs a value inside Tabs');
  }

  const selected = selectedValue === value;

  return (
    <TabFrame
      as="div"
      active={selected}
      scrollRef={list?.scrollRef}
      startSlot={startSlot}
      endSlot={endSlot}
    >
      <button
        {...restProps}
        type="button"
        role="tab"
        id={getTabId(baseId, value)}
        aria-selected={selected}
        aria-controls={getPanelId(baseId, value)}
        tabIndex={selected || list?.fallbackValue === value ? 0 : -1}
        className={classnames(triggerClassName, className)}
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            setValue(value);
          }
        }}
      >
        {children}
      </button>
    </TabFrame>
  );
};

const TabNavTab: React.FC<TabProps> = ({
  asChild,
  children,
  className,
  current,
  endSlot,
  startSlot,
  value: _value,
  ...restProps
}) => {
  const list = useContext(TabListContext);
  const triggerClassName = useComponentStyles('tabs', { trigger: true });

  return (
    <TabFrame
      as="li"
      active={Boolean(current)}
      scrollRef={list?.scrollRef}
      startSlot={startSlot}
      endSlot={endSlot}
    >
      <LinkTemplate
        {...restProps}
        asChild={asChild}
        aria-current={current ? 'page' : undefined}
        className={classnames(triggerClassName, className)}
      >
        <LinkSlot>{children}</LinkSlot>
      </LinkTemplate>
    </TabFrame>
  );
};

/**
 * Inside `Tabs` a `button` with `role="tab"`; inside `TabNav` a link (`a`, or
 * any element through `asChild`) that is `aria-current="page"` when `current`.
 */
export const Tab: React.FC<TabProps> = (props) => {
  const inNav = useContext(TabListContext)?.nav ?? false;

  return inNav ? <TabNavTab {...props} /> : <TabsTab {...props} />;
};
