import { createThemeContract } from '@vanilla-extract/css';
import { makeVanillaTheme } from '../theme/makeVanillaTheme.js';
import { tokens } from './tokens.js';

export const vars = createThemeContract(makeVanillaTheme(tokens));
