'use client';

import {
  type ComponentThemesProps,
  getComponentStyles,
} from '@blockle/blocks-core';

import { useTheme } from '../useTheme/useTheme.js';

export function useComponentStyles<T extends keyof ComponentThemesProps>(
  name: T,
  styleProps: ComponentThemesProps[T],
  useDefaultVariants = true,
): string {
  const theme = useTheme();

  return getComponentStyles(theme, name, styleProps, useDefaultVariants);
}
