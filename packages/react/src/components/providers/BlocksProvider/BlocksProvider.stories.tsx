import { momotaro } from '@blockle/blocks-theme-momotaro';

import preview from '../../../../../../.storybook/preview.js';
import { Button } from '../../form/Button/Button.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { BlocksProvider } from './BlocksProvider.js';

const meta = preview.meta({
  title: 'Providers/BlocksProvider',
  component: BlocksProvider,
  parameters: {
    docs: {
      description: {
        component: [
          'Provides the theme and the Color scheme (`light`, `dark` or `system`).',
          "Without `colorScheme`, a provider inherits its parent provider's scheme, or uses `system` at the top level.",
          'The provider element paints the `surface` background and `text` color.',
          'Apply the top-level provider to the whole page so the page background follows the scheme:',
          '',
          '```tsx',
          '<BlocksProvider theme={momotaro} colorScheme="system" asChild>',
          '  <body>…</body>',
          '</BlocksProvider>',
          '```',
        ].join('\n'),
      },
    },
  },
});

export const Default = meta.story({
  args: {
    children: null,
    theme: momotaro,
    colorScheme: 'dark',
  },
  argTypes: {
    children: { control: false },
    theme: { control: false },
    colorScheme: {
      control: 'inline-radio',
      options: ['light', 'dark', 'system'],
    },
  },
  render({ children: _children, ...props }) {
    return (
      <BlocksProvider {...props} style={{ padding: '1.5rem' }}>
        <Stack gap={3}>
          <Text>This section uses its own Color scheme.</Text>
          <Button>Button</Button>
        </Stack>
      </BlocksProvider>
    );
  },
});

export const Nested = meta.story({
  args: {
    children: null,
    theme: momotaro,
  },
  argTypes: {
    children: { control: false },
    theme: { control: false },
  },
  render({ children: _children, ...props }) {
    return (
      <Stack gap={3}>
        <Text>Follows the toolbar Color scheme.</Text>
        <BlocksProvider
          {...props}
          colorScheme="dark"
          style={{ padding: '1.5rem' }}
        >
          <Stack gap={3}>
            <Text>Nested provider with colorScheme="dark".</Text>
            <BlocksProvider {...props} style={{ padding: '1.5rem' }}>
              <Text>Nested provider without colorScheme inherits dark.</Text>
            </BlocksProvider>
          </Stack>
        </BlocksProvider>
      </Stack>
    );
  },
});
