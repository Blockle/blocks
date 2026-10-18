import { assignVars, createTheme, globalStyle } from '@vanilla-extract/css';

import type { PaletteTokens, ThemeTokens } from '../config/themeTokens.js';
import { vars } from '../css/vars.css.js';
import { type ColorScheme, colorSchemeAttribute } from './colorScheme.js';
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

/**
 * The scheme-dependent variables of the theme contract.
 */
const schemeContract = {
  color: vars.color,
  shadow: vars.shadow,
};

function schemeSelector(className: string, colorScheme: ColorScheme) {
  return `${className}[${colorSchemeAttribute}="${colorScheme}"]`;
}

/**
 * Creates the theme class. It assigns the light scheme by default and
 * reassigns only scheme-dependent variables for the dark scheme.
 */
export function makeTheme(theme: ThemeInput): Theme {
  const { base, dark } = makeVanillaTheme(theme);
  const className = createTheme(vars, base);
  const darkStyle = {
    colorScheme: 'dark',
    vars: assignVars(schemeContract, dark),
  } as const;

  globalStyle(className, {
    colorScheme: 'light',
  });

  globalStyle(schemeSelector(className, 'dark'), darkStyle);

  globalStyle(schemeSelector(className, 'system'), {
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
