import type { Decorator, Preview } from '@storybook/react';
import { BlocksProvider } from '../src';
import '../src/lib/css/reset/reset.css';
import { momotaro } from '../src/themes/momotaro';

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
