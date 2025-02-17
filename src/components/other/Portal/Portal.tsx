import { createPortal } from 'react-dom';

export type PortalProps = {
  children: React.ReactNode;
  container?: HTMLElement;
};

export const Portal: React.FC<PortalProps> = ({ children, container }) => {
  return createPortal(<div>{children}</div>, container || document.body);
};
