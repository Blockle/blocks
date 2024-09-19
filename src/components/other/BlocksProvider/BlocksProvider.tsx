import { useEffect, useMemo, useRef, useState } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const [ariaHidden, setAriaHidden] = useState(false);
  const contextValue = useMemo(
    () => ({
      theme,
      setAriaHidden,
    }),
    [theme, setAriaHidden],
  );

  // This is a workaround for React's lack of inert attribute support
  // https://github.com/facebook/react/issues/17157
  useEffect(() => {
    if (ariaHidden) {
      ref.current?.setAttribute('inert', '');
    } else {
      ref.current?.removeAttribute('inert');
    }
  });

  return (
    <BlocksProviderContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={classnames(theme.vars, atoms({ fontFamily: 'primary' }), className)}
        aria-hidden={ariaHidden ? true : undefined}
        // TODO Remove ref and useEffect when React supports inert attribute
        // inert={ariaHidden}
        {...restProps}
      >
        {children}
      </div>
    </BlocksProviderContext.Provider>
  );
};
