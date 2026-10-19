import { momotaro } from '@blockle/blocks-theme-momotaro';
import type { DecoratorFunction } from 'storybook/internal/csf';

import type { ColorScheme } from '../packages/react/src/components/providers/BlocksProvider/BlocksProvider.js';
// Need local import to match react context
import { BlocksProvider } from '../packages/react/src/components/providers/BlocksProvider/BlocksProvider.js';

// biome-ignore lint/suspicious/noExplicitAny: todo fix any
export const previewProviderDecorator: DecoratorFunction<any> = (
  Story,
  context,
) => {
  const colorScheme = context.globals.colorScheme as ColorScheme | undefined;
  const isDocs = context.viewMode === 'docs';

  // The provider paints the scheme's surface, so it fills the canvas and
  // adds the padding that Storybook's "padded" layout would put on <body>.
  return (
    <BlocksProvider
      theme={momotaro}
      colorScheme={colorScheme}
      style={{ padding: '1rem', minHeight: isDocs ? undefined : '100vh' }}
    >
      <Story {...context} />
    </BlocksProvider>
  );
};
