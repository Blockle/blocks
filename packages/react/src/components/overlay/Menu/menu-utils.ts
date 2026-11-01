// Every Menu item that can take focus is a `menuitem*` element that is not
// disabled. Navigation reads them from the DOM, so a new kind of item (such as
// a radio item, `menuitemradio`) joins keyboard navigation by having that role.
const ENABLED_ITEM_SELECTOR = '[role^="menuitem"]:not([aria-disabled="true"])';

export function getEnabledItems(list: HTMLElement | null): HTMLElement[] {
  if (!list) {
    return [];
  }

  return Array.from(list.querySelectorAll<HTMLElement>(ENABLED_ITEM_SELECTOR));
}

export type MenuNavigationKey = 'ArrowDown' | 'ArrowUp' | 'Home' | 'End';

export function isMenuNavigationKey(key: string): key is MenuNavigationKey {
  return (
    key === 'ArrowDown' || key === 'ArrowUp' || key === 'Home' || key === 'End'
  );
}

/**
 * Returns the index to focus after `key`, wrapping at both ends. `current` is
 * -1 when none of the items has focus.
 */
export function getNextIndex(
  key: MenuNavigationKey,
  current: number,
  count: number,
): number {
  switch (key) {
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    case 'ArrowDown':
      return (current + 1) % count;
    case 'ArrowUp':
      return current <= 0 ? count - 1 : current - 1;
  }
}
