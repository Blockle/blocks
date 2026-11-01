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

type MenuNavigationKey = 'ArrowDown' | 'ArrowUp' | 'Home' | 'End';

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

// Items expose their typeahead text in the DOM, so every kind of item (action,
// radio) takes part by setting this attribute to its `textValue`, or its
// `label` when that is a string, and omitting it otherwise.
const TEXT_VALUE_ATTRIBUTE = 'data-text-value'; // keep in sync with MenuItemButton

/**
 * The text an item takes part in typeahead with: its `textValue`, else its
 * `label` when that is a string.
 */
export function getTextValue(item: {
  label: React.ReactNode;
  textValue?: string;
}): string | undefined {
  return (
    item.textValue ?? (typeof item.label === 'string' ? item.label : undefined)
  );
}

export function getItemText(item: HTMLElement): string | undefined {
  return item.getAttribute(TEXT_VALUE_ATTRIBUTE) ?? undefined;
}

export function isTypeaheadKey(event: {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}): boolean {
  return (
    event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
  );
}

/**
 * Returns the index of the item to focus for `search`, or -1 for no match.
 * `texts` holds each item's text, `undefined` for items without any. Typing
 * the same character repeatedly cycles through the items starting with it,
 * beginning after `current`. A longer search matches from `current` itself, so
 * refining a search doesn't skip past the item already in focus.
 */
export function getTypeaheadMatch(
  texts: (string | undefined)[],
  current: number,
  search: string,
): number {
  const query = search.toLowerCase();
  const repeated = query.length > 1 && [...query].every((c) => c === query[0]);
  const prefix = repeated ? query.slice(0, 1) : query;
  const start = repeated || query.length === 1 ? current + 1 : current;

  for (let offset = 0; offset < texts.length; offset++) {
    const index =
      (((start + offset) % texts.length) + texts.length) % texts.length;

    if (texts[index]?.toLowerCase().startsWith(prefix)) {
      return index;
    }
  }

  return -1;
}
