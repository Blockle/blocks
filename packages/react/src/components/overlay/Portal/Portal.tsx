import { createPortal } from 'react-dom';
import { useTheme } from '../../../hooks/useTheme';
import { BlocksProvider } from '../../providers/BlocksProvider';

export type PortalProps = {
  children: React.ReactNode;
  container?: HTMLElement;
};

export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const context = useTheme();

  return createPortal(
    <BlocksProvider theme={context}>{children}</BlocksProvider>,
    container || document.body,
  );
};
