import { createTheme } from '@vanilla-extract/css';
import { BlocksTokens } from './tokenType';
import { vars } from './vars.css';
import { makeVanillaTheme } from './makeVanillaTheme';

export type Theme = {
  name: string;
  tokens: BlocksTokens;
  // components: {};
};

export const makeTheme = (theme: Theme) => {
  return {
    vars: createTheme(vars, makeVanillaTheme(theme.tokens)),
  };
};
