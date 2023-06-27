import { atoms } from '../../lib/css/atoms/sprinkles.css';
import { classnames } from '../../lib/utils/classnames';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: {
    vars: string;
    components: any;
  };
};

// TODO Rename to non provider name?
// Perhaps expose a utility function to apply the theme to the root of the app?
// <body className={} />...</body>
export const BlocksProvider: React.FC<BlocksProviderProps> = ({ children, theme }) => {
  return (
    <div className={classnames(theme.vars, atoms({ fontFamily: 'standard' }))}>{children}</div>
  );
};
