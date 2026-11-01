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
  useCallback,
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
  getNextIndex,
  isMenuNavigationKey,
} from './menu-utils.js';

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

export type MenuRadioItem = {
  value: string;
  label: React.ReactNode;
  /**
   * Text for typeahead, when `label` is not a plain string
   */
  textValue?: string;
  disabled?: boolean;
  endSlot?: React.ReactNode;
};

export type MenuRadioGroupItem = {
  type: 'radio-group';
  value: string;
  onChange: (value: string) => void;
  items: MenuRadioItem[];
};

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
  const listId = useId();
  const generatedTriggerId = useId();
  const triggerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const initialFocus = useRef<InitialFocus>('first');
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = openProp !== undefined;
  const open = (isControlled ? openProp : internalOpen) && items.length > 0;

  const listClassName = useComponentStyles('menu', { list: true }, false);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }

      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const openOn = (which: InitialFocus) => {
    if (items.length === 0) {
      return;
    }

    initialFocus.current = which;
    setOpen(true);
  };

  const close = (returnFocus: boolean) => {
    setOpen(false);

    if (returnFocus) {
      triggerRef.current?.focus();
    }
  };

  const onRequestClose = (reason: RequestCloseReason) => {
    close(reason === 'escape');
  };

  if (Children.count(children) !== 1) {
    throw new Error('Menu component can only have one child');
  }

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

    if (open) {
      close(false);
    } else {
      openOn('first');
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
      openOn(event.key === 'ArrowDown' ? 'first' : 'last');
    }
  };

  const onListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Tab') {
      // Close and let focus move on from the trigger
      triggerRef.current?.focus();
      setOpen(false);
      return;
    }

    if (isMenuNavigationKey(event.key)) {
      const enabled = getEnabledItems(listRef.current);

      if (enabled.length === 0) {
        return;
      }

      event.preventDefault();

      const current = enabled.indexOf(document.activeElement as HTMLElement);

      enabled[getNextIndex(event.key, current, enabled.length)]?.focus();
      return;
    }

    // Typeahead hooks in here: a printable key without ctrl/meta/alt jumps to
    // the next item whose text starts with what was typed
  };

  const onPick = (select: () => void) => {
    select();
    close(true);
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
  onPick: (select: () => void) => void;
};

// Mounts when the list is shown, which is when focus moves into it
const MenuItems: React.FC<MenuItemsProps> = ({
  items,
  listRef,
  initialFocus,
  onPick,
}) => {
  const itemClassName = useComponentStyles('menu', { item: true }, false);
  const indicatorClassName = useComponentStyles(
    'menu',
    { itemIndicator: true },
    false,
  );
  const separatorClassName = useComponentStyles(
    'menu',
    { separator: true },
    false,
  );

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
          {item.items.map((radio) => {
            const checked = radio.value === item.value;
            const textValue =
              radio.textValue ??
              (typeof radio.label === 'string' ? radio.label : undefined);

            return (
              <button
                key={radio.value}
                type="button"
                role="menuitemradio"
                tabIndex={-1}
                aria-checked={checked}
                aria-disabled={radio.disabled || undefined}
                data-text-value={textValue}
                className={itemClassName}
                onClick={() => {
                  if (!radio.disabled) {
                    onPick(() => item.onChange(radio.value));
                  }
                }}
                onPointerMove={(event) => {
                  if (!radio.disabled) {
                    event.currentTarget.focus();
                  }
                }}
              >
                <span className={indicatorClassName} data-radio-indicator="">
                  {checked && <CheckIcon />}
                </span>
                {radio.label}
                {radio.endSlot}
              </button>
            );
          })}
        </Fragment>
      );
    }

    return (
      <button
        // biome-ignore lint/suspicious/noArrayIndexKey: items have no id
        key={index}
        type="button"
        role="menuitem"
        tabIndex={-1}
        aria-disabled={item.disabled || undefined}
        className={itemClassName}
        onClick={() => {
          if (!item.disabled) {
            onPick(item.onSelect);
          }
        }}
        onPointerMove={(event) => {
          if (!item.disabled) {
            event.currentTarget.focus();
          }
        }}
      >
        {item.startSlot}
        {item.label}
        {item.endSlot}
      </button>
    );
  });
};
