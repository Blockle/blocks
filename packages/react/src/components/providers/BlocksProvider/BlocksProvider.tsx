'use client';

import {
  atoms,
  type ColorScheme,
  classnames,
  colorSchemeAttribute,
  type Theme,
} from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { useContext, useMemo } from 'react';

import { BlocksProviderContext } from './context.js';

export type { ColorScheme } from '@blockle/blocks-core';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: Theme;
  /**
   * Color scheme for everything inside this provider.
   * Defaults to the nearest parent provider's scheme, or `system` at the top level.
   */
  colorScheme?: ColorScheme;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
};

const [Template, Slot] = createSlottable('div');

/**
 * Renders a div - unless asChild is true -
 * Provides Blocks theming and the Color scheme to its children.
 *
 * The element gets `data-color-scheme` and paints the `surface` background and
 * `text` color. Apply the top-level provider to the whole page, for example
 * with `asChild` on `<body>`, so the page background follows the scheme.
 */
export const BlocksProvider: React.FC<BlocksProviderProps> = ({
  children,
  theme,
  colorScheme,
  className,
  ...restProps
}) => {
  const parentContext = useContext(BlocksProviderContext);
  const effectiveColorScheme =
    colorScheme ?? parentContext?.colorScheme ?? 'system';

  const contextValue = useMemo(
    () => ({
      theme,
      colorScheme: effectiveColorScheme,
    }),
    [theme, effectiveColorScheme],
  );

  return (
    <BlocksProviderContext value={contextValue}>
      <Template
        className={classnames(
          theme.vars,
          atoms({
            fontFamily: 'body',
            backgroundColor: 'surface',
            color: 'text',
          }),
          className,
        )}
        {...{ [colorSchemeAttribute]: effectiveColorScheme }}
        {...restProps}
      >
        <Slot>{children}</Slot>
      </Template>
    </BlocksProviderContext>
  );
};
