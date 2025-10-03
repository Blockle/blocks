'use client';

import { useMemo } from 'react';

import { type Theme, atoms, classnames } from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { BlocksProviderContext } from './context.js';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
  style?: React.CSSProperties;
  asChild?: boolean;
};

const [Template, Slot] = createSlottable('div');

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
          atoms({ fontFamily: 'primary' }),
          className,
        )}
        {...restProps}
      >
        <Slot>{children}</Slot>
      </Template>
    </BlocksProviderContext>
  );
};
