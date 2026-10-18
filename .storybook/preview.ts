import '@blockle/blocks/reset';
import addonA11y from '@storybook/addon-a11y';
import { definePreview } from '@storybook/react-vite';

import { previewProviderDecorator } from './previewProviderDecorator.js';

export default definePreview({
  addons: [addonA11y()],
  decorators: [previewProviderDecorator],
  globalTypes: {
    colorScheme: {
      description: 'Color scheme passed to BlocksProvider',
      toolbar: {
        title: 'Color scheme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    colorScheme: 'light',
  },
  parameters: {
    // The preview provider paints the canvas and adds the padding itself.
    layout: 'fullscreen',
    controls: {
      expanded: false,
    },
    docs: {
      codePanel: true,
    },
  },
});
