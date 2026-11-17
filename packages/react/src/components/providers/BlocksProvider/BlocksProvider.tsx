'use client';

import {
  atoms,
  type ColorModeSetting,
  classnames,
  colorModeAttribute,
  defaultColorMode,
  type Theme,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { useContext, useEffect, useMemo } from 'react';

import { useIsomorphicLayoutEffect } from '../../../hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js';
import { type BlocksIcons, BlocksProviderContext } from './context.js';

export type { BlocksIcons } from './context.js';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: Theme;
  /**
   * The Color mode of the whole page, written as `data-color-mode` on `<html>`.
   * Only the outermost BlocksProvider uses it; a nested provider ignores it.
   * @default 'system'
   */
  colorMode?: ColorModeSetting;
  /**
   * Your own icons for the ones Blocks draws itself, such as Checkbox's check
   * mark. Pass rendered elements (`{ check: <Check /> }`); keys left out keep
   * Blocks' icons, or a parent BlocksProvider's.
   */
  icons?: Partial<BlocksIcons>;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
};

const [Template, Slot] = createSlottable('div');

/**
 * Keeps `data-color-mode` on `<html>` in sync. Passing null leaves it alone.
 */
function useColorModeAttribute(colorMode: ColorModeSetting | null) {
  useIsomorphicLayoutEffect(() => {
    if (colorMode === null) {
      return;
    }

    const element = document.documentElement;

    element.setAttribute(colorModeAttribute, colorMode);

    return () => {
      element.removeAttribute(colorModeAttribute);
    };
  }, [colorMode]);
}

/**
 * Renders a div - unless asChild is true -
 * Provides Blocks theming context to its children.
 */
export const BlocksProvider: React.FC<BlocksProviderProps> = ({
  children,
  theme,
  colorMode,
  icons,
  className,
  ...restProps
}) => {
  const parentContext = useContext(BlocksProviderContext);
  const isOutermost = parentContext === null;
  const activeColorMode = parentContext
    ? parentContext.colorMode
    : (colorMode ?? defaultColorMode);

  useColorModeAttribute(isOutermost ? activeColorMode : null);

  const ignoresColorMode = !isOutermost && colorMode !== undefined;

  useEffect(() => {
    if (import.meta.env.DEV && ignoresColorMode) {
      console.warn(
        'BlocksProvider: colorMode is ignored on a nested BlocksProvider. Set it on the outermost BlocksProvider.',
      );
    }
  }, [ignoresColorMode]);

  const parentIcons = parentContext?.icons;
  const mergedIcons = useMemo(
    () => ({ ...parentIcons, ...icons }),
    [parentIcons, icons],
  );

  const contextValue = useMemo(
    () => ({
      theme,
      colorMode: activeColorMode,
      icons: mergedIcons,
    }),
    [theme, activeColorMode, mergedIcons],
  );

  return (
    <BlocksProviderContext value={contextValue}>
      <Template
        className={classnames(
          theme.vars,
          atoms({ fontFamily: 'body' }),
          className,
        )}
        {...restProps}
      >
        <Slot>{children}</Slot>
      </Template>
    </BlocksProviderContext>
  );
};
