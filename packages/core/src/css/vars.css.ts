import { createThemeContract } from '@vanilla-extract/css';

import type { ThemeTokens } from '../config/themeTokens.js';
import { makeVanillaTheme } from '../theme/makeVanillaTheme.js';
import { colorRoleTokens, tokens } from './tokens.js';

/**
 * The theme contract: variables a theme sets on its BlocksProvider.
 * Everything except the Color roles, which are set per Color mode on `<html>`.
 */
export const themeVars = createThemeContract(
  makeVanillaTheme(
    // Allow tokens with null values here to create the theme contract
    tokens as ThemeTokens,
  ),
);

/** The Color role variables, set per Color mode on `<html>`. */
export const colorRoleVars = createThemeContract(colorRoleTokens);

/** All theme variables, including the Color roles as `vars.colorRole`. */
export const vars = { ...themeVars, colorRole: colorRoleVars };
