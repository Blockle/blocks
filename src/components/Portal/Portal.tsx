import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { BlocksProvider } from '../BlocksProvider/BlocksProvider';
import { useTheme } from '../../hooks/useTheme';

export type PortalProps = {
  children: ReactNode;
  container?: HTMLElement;
};

export const Portal: FC<PortalProps> = ({ children, container }) => {
  const context = useTheme();

  return createPortal(
    <BlocksProvider theme={context}>{children}</BlocksProvider>,
    container || document.body,
  );
};
