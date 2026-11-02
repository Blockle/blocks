'use client';

import {
  type ComponentThemeElement,
  type ComponentThemes,
  type ComponentThemeVariantsArg,
  getComponentStyles,
} from '@blockle/blocks-core';

import { useTheme } from '../useTheme/useTheme.js';

export function useComponentStyles<T extends keyof ComponentThemes>(
  name: T,
  element: ComponentThemeElement<T>,
  ...variants: ComponentThemeVariantsArg<T>
): string {
  const theme = useTheme();

  return getComponentStyles(theme, name, element, ...variants);
}
