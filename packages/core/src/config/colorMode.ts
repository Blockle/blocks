/**
 * The Color modes Blocks defines. Every theme provides values for each of them.
 * Adding a mode here is all core needs; the rest of the mechanism iterates over
 * this list (see `systemColorModeQueries` for how `system` finds the new mode).
 */
export const colorModes = ['light', 'dark'] as const;

export type ColorMode = (typeof colorModes)[number];

/** What a BlocksProvider accepts: a Color mode, or `system` to follow the OS. */
export type ColorModeSetting = ColorMode | 'system';

/** The Color mode used when `BlocksProvider` isn't given a `colorMode`. */
export const defaultColorMode: ColorModeSetting = 'light';

/** The attribute on `<html>` that carries the active ColorModeSetting. */
export const colorModeAttribute = 'data-color-mode';

/**
 * The Color mode `system` renders when no media query below matches (the OS
 * has no preference, or the browser doesn't support them).
 */
export const systemFallbackColorMode: ColorMode = 'light';

/**
 * The media query under which `system` renders each Color mode. A mode without
 * an entry is never picked by `system`.
 */
export const systemColorModeQueries: Partial<Record<ColorMode, string>> = {
  dark: '(prefers-color-scheme: dark)',
};

/** A value given for every Color mode, such as `{ light: 'neutral-900', dark: 'neutral-100' }`. */
export type ModeValue<T> = Record<ColorMode, T>;
