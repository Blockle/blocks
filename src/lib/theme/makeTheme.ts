import { createTheme } from '@vanilla-extract/css';
import { ThemeComponentsStyles } from './makeComponentTheme';
import { makeVanillaTheme } from './makeVanillaTheme';
import { ThemeTokens } from './tokensType';
import { vars } from './vars.css';

type ThemeInput = {
  name: string;
  tokens: ThemeTokens;
  components: Partial<ThemeComponentsStyles>;
};

export type Theme = {
  name: string;
  vars: string;
  components: Partial<ThemeComponentsStyles>;
};

export function makeTheme(theme: ThemeInput): Theme {
  return {
    name: theme.name,
    vars: createTheme(vars, makeVanillaTheme(theme.tokens)),
    components: theme.components,
  };
}
