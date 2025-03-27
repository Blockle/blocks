import { momotaro } from '@blockle/blocks-theme-momotaro';
import '@blockle/blocks/reset';
import type { Decorator, Preview } from '@storybook/react';
// Relative `BlocksProvider` import for tests to also work correctly
import { BlocksProvider } from '../packages/react/src/components/providers/BlocksProvider';

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
