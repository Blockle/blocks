import {
  type ColorModeSetting,
  colorModes,
  defaultColorMode,
} from '@blockle/blocks-core';
import { momotaro } from '@blockle/blocks-theme-momotaro';
import type { DecoratorFunction } from 'storybook/internal/csf';

// Need local import to match react context
import { BlocksProvider } from '../packages/react/src/components/providers/BlocksProvider/BlocksProvider.js';

// biome-ignore lint/suspicious/noExplicitAny: todo fix any
export const previewProviderDecorator: DecoratorFunction<any> = (
  Story,
  context,
) => (
  <BlocksProvider
    theme={momotaro}
    colorMode={toColorModeSetting(context.globals.colorMode)}
  >
    <Story {...context} />
  </BlocksProvider>
);

function toColorModeSetting(value: unknown): ColorModeSetting {
  if (value === 'system') {
    return 'system';
  }

  return colorModes.find((mode) => mode === value) ?? defaultColorMode;
}
