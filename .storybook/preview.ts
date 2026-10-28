import '@blockle/blocks/reset';
import addonA11y from '@storybook/addon-a11y';
import { definePreview } from '@storybook/react-vite';

import { previewProviderDecorator } from './previewProviderDecorator.js';

export default definePreview({
  addons: [addonA11y()],
  decorators: [previewProviderDecorator],
  initialGlobals: {
    colorMode: 'light',
  },
  globalTypes: {
    colorMode: {
      description: 'Color mode of the BlocksProvider',
      toolbar: {
        title: 'Color mode',
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      expanded: false,
    },
    docs: {
      codePanel: true,
    },
  },
});
