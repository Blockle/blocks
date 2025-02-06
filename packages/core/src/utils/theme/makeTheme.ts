import { createTheme } from '@vanilla-extract/css';
import type { ThemeTokens } from '../../config/themeTokens';
import { vars } from '../../css/vars.css';
import type { ThemeComponentsStyles } from './makeComponentTheme';
import { makeVanillaTheme } from './makeVanillaTheme';

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
