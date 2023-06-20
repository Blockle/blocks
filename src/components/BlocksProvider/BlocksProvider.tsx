import { atoms } from '../../lib/css/atoms/sprinkles.css';
import { classnames } from '../../lib/utils/classnames';

export type BlocksProviderProps = {
  children: React.ReactNode;
  theme: {
    vars: string;
  };
};

export const BlocksProvider: React.FC<BlocksProviderProps> = ({ children, theme }) => {
  return (
    <div className={classnames(theme.vars, atoms({ fontFamily: 'standard' }))}>{children}</div>
  );
};
