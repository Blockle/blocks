import type { Theme } from './makeTheme';

// Side effect
let _theme: Theme;

export const setTheme = (theme: Theme): void => {
  _theme = theme;
};

export const getTheme = (): Theme => {
  return _theme;
};
