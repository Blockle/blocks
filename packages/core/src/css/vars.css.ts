import { createThemeContract } from '@vanilla-extract/css';

import { makeVanillaTheme } from '../theme/makeVanillaTheme.js';
import { tokens } from './tokens.js';

export const vars = createThemeContract(
  // Tokens with null values are only used to create the theme contract
  makeVanillaTheme(tokens).base,
);
