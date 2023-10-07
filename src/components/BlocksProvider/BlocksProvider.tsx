import { atoms } from '../../lib/css/atoms/sprinkles.css';
import { classnames } from '../../lib/utils/classnames';
import { BlocksProviderContext, BlocksProviderContextData } from './context';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: BlocksProviderContextData;
};

// Perhaps expose a utility function to apply the theme to the root of the app?
// <body className={} />...</body>
export const BlocksProvider: React.FC<BlocksProviderProps> = ({ children, theme }) => {
  return (
    <BlocksProviderContext.Provider value={theme}>
      <div className={classnames(theme.vars, atoms({ fontFamily: 'standard' }))}>{children}</div>
    </BlocksProviderContext.Provider>
  );
};
