import { useMemo } from 'react';

import { type Theme, classnames, sprinkles } from '@blockle/blocks-core';
import { createSlottable } from '@blockle/blocks-react-slot';
import { BlocksProviderContext } from './context';

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
          sprinkles({ fontFamily: 'primary' }),
          className,
        )}
        {...restProps}
      >
        <Slot>{children}</Slot>
      </Template>
    </BlocksProviderContext>
  );
};
