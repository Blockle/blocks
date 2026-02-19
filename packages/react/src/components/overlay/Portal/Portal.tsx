'use client';

import { createPortal } from 'react-dom';

import { useTheme } from '../../../hooks/useTheme/useTheme.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';

export type PortalProps = {
  children: React.ReactNode;
  container?: HTMLElement;
};

export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const currentTheme = useTheme();

  return createPortal(
    <BlocksProvider theme={currentTheme}>{children}</BlocksProvider>,
    container || document.body,
  );
};
