'use client';

import { createPortal } from 'react-dom';

import { useTheme } from '../../../hooks/useTheme/useTheme.js';
import { BlocksProvider } from '../../providers/BlocksProvider/BlocksProvider.js';

export type PortalProps = {
  children: React.ReactNode;
  container?: HTMLElement;
};

const wrapperStyle: React.CSSProperties = { display: 'contents' };

export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  const currentTheme = useTheme();

  // React context crosses the portal, so this provider inherits the Color
  // scheme of the place that opened it. `display: contents` keeps the wrapper
  // from painting a box, while the theme class and `data-color-scheme` still
  // pass the CSS variables to its content.
  return createPortal(
    <BlocksProvider theme={currentTheme} style={wrapperStyle}>
      {children}
    </BlocksProvider>,
    container || document.body,
  );
};
