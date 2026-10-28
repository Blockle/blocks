import { assignVars, globalStyle } from '@vanilla-extract/css';

import {
  type ColorMode,
  colorModeAttribute,
  colorModes,
  systemColorModeQueries,
  systemFallbackColorMode,
} from '../config/colorMode.js';
import type { ColorRoles, ThemeTokens } from '../config/themeTokens.js';
import { colorRoleVars } from '../css/vars.css.js';
import { makeVanillaTheme } from './makeVanillaTheme.js';

type ColorRoleValues = {
  [Group in keyof ColorRoles]: Record<keyof ColorRoles[Group], string>;
};

const modeSelector = (setting: string) =>
  `html[${colorModeAttribute}="${setting}"]`;

/**
 * Resolves the Color roles to the values of one Color mode. Palette references
 * (`neutral-900`) become the palette's color. They're resolved here, not
 * referenced as variables, because the palette variables live on the
 * BlocksProvider element while the roles are set on `<html>`.
 */
function resolveColorRoles(
  tokens: ThemeTokens,
  mode: ColorMode,
  palette: Record<string, string>,
): ColorRoleValues {
  const values: Record<string, Record<string, string>> = {};

  for (const [group, roles] of Object.entries(tokens.colorRoles)) {
    values[group] = {};

    for (const [role, modeValue] of Object.entries(roles)) {
      const value = (modeValue as Record<ColorMode, string>)[mode];

      (values[group] as Record<string, string>)[role] = palette[value] ?? value;
    }
  }

  return values as ColorRoleValues;
}

/**
 * Emits the Color role values of every Color mode, scoped to `data-color-mode`
 * on `<html>`, and sets `color-scheme` to match. Must run in a `.css.ts` file.
 *
 * - `html[data-color-mode="<mode>"]` gets that mode's values.
 * - `html[data-color-mode="system"]` gets the fallback mode's values, plus each
 *   other mode's values inside the media query in `systemColorModeQueries`.
 * - Without the attribute (before a provider has mounted), the fallback mode applies.
 */
export function makeColorModeStyles(tokens: ThemeTokens) {
  const palette = makeVanillaTheme(tokens).color as Record<string, string>;
  const valuesOf = (mode: ColorMode) =>
    assignVars(colorRoleVars, resolveColorRoles(tokens, mode, palette));

  for (const mode of colorModes) {
    const selectors = [modeSelector(mode)];

    if (mode === systemFallbackColorMode) {
      selectors.push(':root', modeSelector('system'));
    }

    globalStyle(selectors.join(', '), {
      colorScheme: mode,
      vars: valuesOf(mode),
    });
  }

  // `system` allows every mode, and applies the ones that have a query
  // only while that query matches.
  globalStyle(modeSelector('system'), { colorScheme: colorModes.join(' ') });

  for (const mode of colorModes) {
    const query = systemColorModeQueries[mode];

    if (query) {
      globalStyle(modeSelector('system'), {
        '@media': { [query]: { vars: valuesOf(mode) } },
      });
    }
  }
}
