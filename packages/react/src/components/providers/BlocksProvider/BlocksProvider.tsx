import { useMemo, useState } from 'react';

import { type Theme, classnames, sprinkles } from '@blockle/blocks-core';
import { BlocksProviderContext } from './context';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: Theme;
  className?: string;
  style?: React.CSSProperties;
};

export const BlocksProvider: React.FC<BlocksProviderProps> = ({
  children,
  theme,
  className,
  ...restProps
}) => {
  const [ariaHidden, setAriaHidden] = useState(false);
  const contextValue = useMemo(
    () => ({
      theme,
      setAriaHidden,
    }),
    [theme],
  );

  return (
    <BlocksProviderContext value={contextValue}>
      <div
        className={classnames(
          theme.vars,
          sprinkles({ fontFamily: 'primary' }),
          className,
        )}
        inert={ariaHidden ? true : undefined}
        {...restProps}
      >
        {children}
      </div>
    </BlocksProviderContext>
  );
};
