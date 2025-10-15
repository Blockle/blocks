import { createTheme } from '@vanilla-extract/css';

import type { ThemeTokens } from '../config/themeTokens.js';
import { vars } from '../css/vars.css.js';
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
  return {
    name: theme.name,
    vars: createTheme(vars, makeVanillaTheme(theme.tokens)),
    components: theme.components,
  };
}
