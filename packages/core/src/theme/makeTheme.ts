import { createTheme } from '@vanilla-extract/css';

import type { ThemeTokens } from '../config/themeTokens.js';
import { themeVars } from '../css/vars.css.js';
import { makeColorModeStyles } from './makeColorModeStyles.js';
import type { ThemeComponentsStyles } from './makeComponentTheme.js';
import { makeVanillaTheme } from './makeVanillaTheme.js';

type ThemeInput = {
  name: string;
  tokens: ThemeTokens;
  components: ThemeComponentsStyles;
};

export type Theme = {
  name: string;
  vars: string;
  components: ThemeComponentsStyles;
};

export function makeTheme(theme: ThemeInput): Theme {
  makeColorModeStyles(theme.tokens);

  return {
    name: theme.name,
    vars: createTheme(themeVars, makeVanillaTheme(theme.tokens)),
    components: theme.components,
  };
}
