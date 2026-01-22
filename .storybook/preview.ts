import '@blockle/blocks/reset';
import addonA11y from '@storybook/addon-a11y';
import { definePreview } from '@storybook/react-vite';

import { previewProviderDecorator } from './previewProviderDecorator.js';

export default definePreview({
  addons: [addonA11y()],
  decorators: [previewProviderDecorator],
  parameters: {
    controls: {
      expanded: false,
    },
    docs: {
      codePanel: true,
    },
  },
});
