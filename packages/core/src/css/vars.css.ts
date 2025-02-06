import { createThemeContract } from '@vanilla-extract/css';
import { makeVanillaTheme } from '../utils/theme/makeVanillaTheme';
import { tokens } from './tokens';

export const vars = createThemeContract(makeVanillaTheme(tokens));
