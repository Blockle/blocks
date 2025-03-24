import { BlocksProvider } from '@blockle/blocks-react';
import { momotaro } from '@blockle/blocks-theme-momotaro';
import '@blockle/blocks/reset';
import type { Decorator, Preview } from '@storybook/react';

// import spriteUrl from '../assets/icons.svg';
// TODO <BlocksProvider spriteUrl={spriteUrl}
const withProviders: Decorator = (Story, context) => (
  <BlocksProvider theme={momotaro}>
    <Story {...context} />
  </BlocksProvider>
);

export const decorators = [withProviders];

const preview: Preview = {
  decorators,
  parameters: {
    controls: { expanded: false },
  },
};

export default preview;
