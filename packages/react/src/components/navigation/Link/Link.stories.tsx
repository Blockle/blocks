import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Alert } from '../../feedback/Alert/Alert.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Link } from './Link.js';

const meta = preview.meta({
  title: 'Navigation/Link',
  component: Link,
  argTypes: {
    intent: {
      control: 'radio',
      options: ['primary', 'neutral', 'inherit'],
    },
    underline: {
      control: 'boolean',
    },
  },
});

export const Default = meta.story({
  args: {
    children: 'Link',
    href: 'https://example.com',
    underline: true,
    onClick: action('Link clicked'),
  },
});

export const Intents = meta.story({
  render: () => (
    <Stack gap={4}>
      <Text>
        Read the{' '}
        <Link href="https://example.com" intent="primary">
          getting started guide
        </Link>{' '}
        first.
      </Text>
      <Text color="muted">
        Updated 2 days ago by{' '}
        <Link href="https://example.com" intent="neutral">
          Sam
        </Link>
      </Text>
      <Alert intent="warning" role="status">
        This Ticket is archived.{' '}
        <Link href="https://example.com" intent="inherit" underline>
          Restore it
        </Link>
      </Alert>
    </Stack>
  ),
});
