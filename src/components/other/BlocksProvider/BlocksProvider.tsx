import { useMemo, useState } from 'react';
import { atoms } from '../../../lib/css/atoms/sprinkles.css';
import { Theme } from '../../../lib/theme/makeTheme';
import { classnames } from '../../../lib/utils/classnames';
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
    [theme, setAriaHidden],
  );

  return (
    <BlocksProviderContext value={contextValue}>
      <div
        className={classnames(theme.vars, atoms({ fontFamily: 'primary' }), className)}
        inert={ariaHidden ? true : undefined}
        {...restProps}
      >
        {children}
      </div>
    </BlocksProviderContext>
  );
};
