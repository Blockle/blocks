'use client';

import { atoms, classnames, type Theme } from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { useMemo } from 'react';

import { BlocksProviderContext } from './context.js';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
};

const [Template, Slot] = createSlottable('div');

/**
 * Renders a div - unless asChild is true -
 * Provides Blocks theming context to its children.
 */
export const BlocksProvider: React.FC<BlocksProviderProps> = ({
  children,
  theme,
  className,
  ...restProps
}) => {
  const contextValue = useMemo(
    () => ({
      theme,
    }),
    [theme],
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
