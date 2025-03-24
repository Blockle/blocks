import { createThemeContract } from '@vanilla-extract/css';
import { makeVanillaTheme } from '../theme/makeVanillaTheme';
import { tokens } from './tokens';

export const vars = createThemeContract(makeVanillaTheme(tokens));
