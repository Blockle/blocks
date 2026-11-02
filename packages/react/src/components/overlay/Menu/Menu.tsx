'use client';

import {
  classnames,
  composeRefs,
  type HTMLElementProps,
} from '@blockle/blocks-core';
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { useComponentStyles } from '../../../hooks/useComponentStyles/useComponentStyles.js';
import { CheckIcon } from '../../../icons/icons.js';
import { Popover, type PopoverProps } from '../Popover/Popover.js';
import type { RequestCloseReason } from '../requestCloseReason.js';
import {
  getEnabledItems,
  getItemText,
  getNextIndex,
  getTextValue,
  getTypeaheadMatch,
  isMenuNavigationKey,
  isTypeaheadKey,
} from './menu-utils.js';

// Pause after which typed characters no longer extend the typeahead search
const TYPEAHEAD_RESET_MS = 500;

type ReactElement = React.ReactElement<
  // biome-ignore lint/suspicious/noExplicitAny: necessary for dynamic element types
  any,
  // biome-ignore lint/suspicious/noExplicitAny: necessary for dynamic element types
  string | React.JSXElementConstructor<any>
>;

export type MenuActionItem = {
  type?: undefined;
  label: React.ReactNode;
  /**
   * Text for typeahead, when `label` is not a plain string
   */
  textValue?: string;
  onSelect: () => void;
  disabled?: boolean;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
};

export type MenuSeparatorItem = {
  type: 'separator';
};

export type MenuRadioItem<V extends string = string> = {
  value: V;
  label: React.ReactNode;
  /**
   * Text for typeahead, when `label` is not a plain string
   */
  textValue?: string;
  disabled?: boolean;
  endSlot?: React.ReactNode;
};

export type MenuRadioGroupItem<V extends string = string> = {
  type: 'radio-group';
  value: V;
  onChange: (value: V) => void;
  items: MenuRadioItem<V>[];
};

/**
 * Types a radio group over a union of values. `V` is inferred from `value`
 * and `onChange`, and the items' values are checked against it. Returns the
 * group as is, so it can sit in `items` next to any other item.
 */
export function menuRadioGroup<V extends string>(group: {
  type: 'radio-group';
  value: V;
  onChange: (value: V) => void;
  items: MenuRadioItem<NoInfer<V>>[];
}): MenuRadioGroupItem {
  // Menu only calls `onChange` with the values of the group's own items, so
  // widening `V` to string here is safe
  return group as unknown as MenuRadioGroupItem;
}

export type MenuItem = MenuActionItem | MenuSeparatorItem | MenuRadioGroupItem;

export type MenuProps = {
  /**
   * The trigger, usually a `Button` or `IconButton`
   */
  children: ReactElement;
  items: MenuItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * Side of the trigger to open on, and which of its edges to line up with
   * @default 'bottom-start'
   */
  placement?: PopoverProps['placement'];
} & Omit<HTMLElementProps<HTMLDivElement>, 'ref' | 'children'>;

type InitialFocus = 'first' | 'last';

function focusItem(list: HTMLElement | null, which: InitialFocus) {
  const items = getEnabledItems(list);

  items.at(which === 'first' ? 0 : -1)?.focus();
}

export const Menu: React.FC<MenuProps> = ({
  children,
  items,
  open: openProp,
  onOpenChange,
  placement = 'bottom-start',
  className,
  ...restProps
}) => {
  if (Children.count(children) !== 1) {
    throw new Error('Menu component can only have one child');
  }

  const listId = useId();
  const generatedTriggerId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef('');
  const searchTimeoutRef = useRef<number>(undefined);
  const initialFocus = useRef<InitialFocus>('first');
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = openProp !== undefined;
  const open = (isControlled ? openProp : internalOpen) && items.length > 0;

  const listClassName = useComponentStyles('menu', 'list');

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }

    onOpenChange?.(next);
  };

  const openAndFocus = (which: InitialFocus) => {
    if (items.length === 0) {
      return;
    }

    initialFocus.current = which;
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const closeAndFocusTrigger = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onRequestClose = (reason: RequestCloseReason) => {
    if (reason === 'escape') {
      closeAndFocusTrigger();
    } else {
      closeMenu();
    }
  };

  useEffect(() => {
    return () => window.clearTimeout(searchTimeoutRef.current);
  }, []);

  const child = Children.toArray(children)[0] as ReactElement;

  if (!isValidElement(child)) {
    return null;
  }

  const trigger = child as ReactElement;

  const triggerId: string = trigger.props.id ?? generatedTriggerId;

  const onTriggerClick = (event: React.MouseEvent) => {
    trigger.props.onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    // While open, a click on the trigger is an outside click of the list,
    // which already requests the close
    if (!open) {
      openAndFocus('first');
    }
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    trigger.props.onKeyDown?.(event);

    if (event.defaultPrevented || open) {
      return;
    }

    // Enter and Space activate the trigger's click, which opens on the first item
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openAndFocus(event.key === 'ArrowDown' ? 'first' : 'last');
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      // Close and let focus move on from the trigger
      closeAndFocusTrigger();
      return;
    }

    const navigationKey = isMenuNavigationKey(event.key) ? event.key : null;

    if (!navigationKey && !isTypeaheadKey(event)) {
      return;
    }

    const enabled = getEnabledItems(listRef.current);
    const current = enabled.indexOf(document.activeElement as HTMLElement);

    if (navigationKey) {
      if (enabled.length === 0) {
        return;
      }

      event.preventDefault();
      enabled[getNextIndex(navigationKey, current, enabled.length)]?.focus();
      return;
    }

    // Space picks the focused item, unless it continues a search
    if (event.key === ' ' && searchRef.current === '') {
      return;
    }

    event.preventDefault();
    window.clearTimeout(searchTimeoutRef.current);
    searchRef.current += event.key;
    searchTimeoutRef.current = window.setTimeout(() => {
      searchRef.current = '';
    }, TYPEAHEAD_RESET_MS);

    enabled[
      getTypeaheadMatch(enabled.map(getItemText), current, searchRef.current)
    ]?.focus();
  };

  const onPick = (select: () => void) => {
    select();
    closeAndFocusTrigger();
  };

  return (
    <>
      {cloneElement(trigger, {
        ref: composeRefs(triggerRef, trigger.props.ref),
        id: triggerId,
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': open ? listId : undefined,
        onClick: onTriggerClick,
        onKeyDown: onTriggerKeyDown,
      })}
      <Popover
        {...restProps}
        ref={listRef}
        id={listId}
        role="menu"
        aria-labelledby={triggerId}
        anchorElement={triggerRef}
        open={open}
        onRequestClose={onRequestClose}
        placement={placement}
        limitHeight
        className={classnames(listClassName, className)}
        onKeyDown={onListKeyDown}
      >
        <MenuItems
          items={items}
          listRef={listRef}
          initialFocus={initialFocus.current}
          onPick={onPick}
        />
      </Popover>
    </>
  );
};

type MenuItemsProps = {
  items: MenuItem[];
  listRef: React.RefObject<HTMLElement | null>;
  initialFocus: InitialFocus;
  // Runs `action` for the picked item, then closes the menu
  onPick: (action: () => void) => void;
};

// Mounts when the list is shown, which is when focus moves into it
const MenuItems: React.FC<MenuItemsProps> = ({
  items,
  listRef,
  initialFocus,
  onPick,
}) => {
  const separatorClassName = useComponentStyles('menu', 'separator');

  // biome-ignore lint/correctness/useExhaustiveDependencies: only on mount
  useEffect(() => {
    focusItem(listRef.current, initialFocus);
  }, []);

  return items.map((item, index) => {
    if (item.type === 'separator') {
      return (
        <hr
          // biome-ignore lint/suspicious/noArrayIndexKey: items have no id
          key={index}
          className={separatorClassName}
        />
      );
    }

    if (item.type === 'radio-group') {
      return (
        // biome-ignore lint/suspicious/noArrayIndexKey: items have no id
        <Fragment key={index}>
          {item.items.map((radio) => (
            <MenuRadio
              key={radio.value}
              item={radio}
              checked={radio.value === item.value}
              onActivate={() => onPick(() => item.onChange(radio.value))}
            />
          ))}
        </Fragment>
      );
    }

    return (
      <MenuItemButton
        // biome-ignore lint/suspicious/noArrayIndexKey: items have no id
        key={index}
        role="menuitem"
        item={item}
        onActivate={() => onPick(item.onSelect)}
      >
        {item.startSlot}
        {item.label}
        {item.endSlot}
      </MenuItemButton>
    );
  });
};

type MenuItemButtonProps = {
  role: 'menuitem' | 'menuitemradio';
  item: Pick<MenuActionItem, 'label' | 'textValue' | 'disabled'>;
  onActivate: () => void;
  children: React.ReactNode;
} & Pick<React.AriaAttributes, 'aria-checked'>;

// The button shared by action and radio items. A disabled item stays in the
// DOM and keeps `aria-disabled` so it is announced, but does nothing.
const MenuItemButton: React.FC<MenuItemButtonProps> = ({
  role,
  item,
  onActivate,
  children,
  ...ariaProps
}) => {
  const className = useComponentStyles('menu', 'item');

  return (
    <button
      type="button"
      role={role}
      tabIndex={-1}
      aria-disabled={item.disabled || undefined}
      data-text-value={getTextValue(item)}
      {...ariaProps}
      className={className}
      onClick={() => {
        if (!item.disabled) {
          onActivate();
        }
      }}
      onPointerMove={(event) => {
        if (!item.disabled) {
          event.currentTarget.focus();
        }
      }}
    >
      {children}
    </button>
  );
};

type MenuRadioProps = {
  item: MenuRadioItem;
  checked: boolean;
  onActivate: () => void;
};

const MenuRadio: React.FC<MenuRadioProps> = ({ item, checked, onActivate }) => {
  const indicatorClassName = useComponentStyles('menu', 'itemIndicator');

  return (
    <MenuItemButton
      role="menuitemradio"
      aria-checked={checked}
      item={item}
      onActivate={onActivate}
    >
      <span className={indicatorClassName} data-radio-indicator="">
        {checked && <CheckIcon />}
      </span>
      {item.label}
      {item.endSlot}
    </MenuItemButton>
  );
};
