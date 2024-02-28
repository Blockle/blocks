import { useContext } from 'react';
import { BlocksProviderContext } from '../../components/other/BlocksProvider/context';
/**
 * Sets the `aria-hidden` attribute on this provider's root element.
 *
 * Usefull for modals and other overlays that should hide the rest of the page from screen readers
 * and are rendered inside their own `BlocksProvider`.
 */
export const useRootAriaHidden = (hidden: boolean) => {
  const context = useContext(BlocksProviderContext);

  if (!context) {
    throw new Error('useRootAriaHidden must be used within a BlocksProvider');
  }

  context.setAriaHidden(hidden);
};
