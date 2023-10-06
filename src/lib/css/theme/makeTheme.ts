import { createTheme } from '@vanilla-extract/css';
import { ComponentThemesMap } from './componentThemes';
import { makeVanillaTheme } from './makeVanillaTheme';
import { BlocksTokens } from './tokenType';
import { vars } from './vars.css';

export type Theme = {
  name: string;
  tokens: BlocksTokens;
  components: ComponentThemesMap;
};

export const makeTheme = (theme: Theme) => {
  return {
    vars: createTheme(vars, makeVanillaTheme(theme.tokens)),
    components: theme.components,
  };
};
