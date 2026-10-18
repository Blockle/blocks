import { assignVars, createTheme, globalStyle } from '@vanilla-extract/css';

import type { PaletteTokens, ThemeTokens } from '../config/themeTokens.js';
import { vars } from '../css/vars.css.js';
import type { ThemeComponentsStyles } from './makeComponentTheme.js';
import { makeVanillaTheme, type ThemeSchemes } from './makeVanillaTheme.js';

export type ThemeInput = {
  name: string;
  tokens: ThemeTokens;
  palette: PaletteTokens;
  schemes: ThemeSchemes;
  components: ThemeComponentsStyles;
};

export type Theme = {
  name: string;
  vars: string;
  components: ThemeComponentsStyles;
};

type SchemeValues = ReturnType<typeof makeVanillaTheme>['dark'];

/**
 * Picks the scheme-dependent variables from the theme contract.
 */
function getSchemeContract(values: SchemeValues) {
  return {
    color: Object.fromEntries(
      Object.keys(values.color).map((role) => [
        role,
        vars.color[role as keyof typeof vars.color],
      ]),
    ) as Record<keyof SchemeValues['color'], (typeof vars.color)['surface']>,
    shadow: vars.shadow,
  };
}

/**
 * Creates the theme class. It assigns the light scheme by default and
 * reassigns only scheme-dependent variables for the dark scheme.
 */
export function makeTheme(theme: ThemeInput): Theme {
  const { light, dark } = makeVanillaTheme(theme);
  const className = createTheme(vars, light);
  const darkStyle = {
    colorScheme: 'dark',
    vars: assignVars(getSchemeContract(dark), dark),
  } as const;

  globalStyle(className, {
    colorScheme: 'light',
  });

  globalStyle(`${className}[data-color-scheme="dark"]`, darkStyle);

  globalStyle(`${className}[data-color-scheme="system"]`, {
    '@media': {
      '(prefers-color-scheme: dark)': darkStyle,
    },
  });

  return {
    name: theme.name,
    vars: className,
    components: theme.components,
  };
}
