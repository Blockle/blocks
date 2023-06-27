import { Theme } from '../css/theme/makeTheme';

let $theme: Theme | null = null;

export const setTheme = (theme: Theme) => {
  $theme = theme;
};

export const getTheme = () => {
  return $theme;
};
