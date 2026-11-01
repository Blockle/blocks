'use client';

import { classnames, type HTMLElementProps } from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { useContext, useEffect, useRef } from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { TabNavContext } from './TabNavContext.js';
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
} & Omit<
  HTMLElementProps<HTMLAnchorElement>,
  'children' | 'ref' | 'type' | 'value'
>;

function hasContent(node: React.ReactNode) {
  return node !== null && node !== undefined && node !== false;
}

// Scrolls the tab list sideways just far enough to show the tab. Done by hand
// rather than with scrollIntoView, which would scroll the page vertically too.
function revealInline(tab: HTMLElement) {
  const list = tab.closest<HTMLElement>('[role="tablist"], nav');

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

type TabFrameProps = {
  /** Selected (Tabs) or current (TabNav) */
  active: boolean;
  as: 'div' | 'li';
  children: React.ReactNode;
  endSlot: React.ReactNode;
  startSlot: React.ReactNode;
};

// The wrapper holds the activation element and its Slots; the Tab indicator
// anchors to it. Shared by both roots so they look the same.
const TabFrame: React.FC<TabFrameProps> = ({
  active,
  as: Wrapper,
  children,
  endSlot,
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
    if (active && wrapperRef.current) {
      revealInline(wrapperRef.current);
    }
  }, [active]);

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

  const triggerClassName = useComponentStyles('tabs', { trigger: true });

  if (value === undefined) {
    throw new Error('Tab needs a value inside Tabs');
  }

  const selected = selectedValue === value;

  return (
    <TabFrame
      as="div"
      active={selected}
      startSlot={startSlot}
      endSlot={endSlot}
    >
      <button
        type="button"
        role="tab"
        id={getTabId(baseId, value)}
        aria-selected={selected}
        aria-controls={getPanelId(baseId, value)}
        tabIndex={selected ? 0 : -1}
        className={classnames(triggerClassName, className)}
        onClick={(event) => {
          // biome-ignore lint/suspicious/noExplicitAny: the props are typed for the link variant
          (onClick as any)?.(event);

          if (!event.defaultPrevented) {
            setValue(value);
          }
        }}
        {...(restProps as React.ComponentProps<'button'>)}
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
  const triggerClassName = useComponentStyles('tabs', { trigger: true });

  return (
    <TabFrame
      as="li"
      active={Boolean(current)}
      startSlot={startSlot}
      endSlot={endSlot}
    >
      <LinkTemplate
        asChild={asChild}
        aria-current={current ? 'page' : undefined}
        className={classnames(triggerClassName, className)}
        {...restProps}
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
  const inNav = useContext(TabNavContext);

  return inNav ? <TabNavTab {...props} /> : <TabsTab {...props} />;
};
