import { createThemeContract } from '@vanilla-extract/css';
import type { ThemeTokens } from '../config/themeTokens.js';
import { makeVanillaTheme } from '../theme/makeVanillaTheme.js';
import { tokens } from './tokens.js';

export const vars = createThemeContract(
  makeVanillaTheme(
    // Allow tokens with null values here to create the theme contract
    tokens as ThemeTokens,
  ),
);
