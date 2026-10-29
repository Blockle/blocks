import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Heading } from './Heading.js';

const meta = preview.meta({
  title: 'Typography/Heading',
  component: Heading,
  argTypes: {
    color: {
      control: 'select',
      options: ['default', 'muted', 'disabled', 'inverse', 'primary-700'],
    },
    fontSize: {
      type: 'string',
      options: Object.keys(atomicProperties.fontSize.values),
      control: {
        type: 'select',
      },
    },
    textAlign: {
      type: 'string',
      options: Object.keys(atomicProperties.textAlign.values),
      control: {
        type: 'select',
      },
    },
  },
});

export const Default = meta.story({
  args: {
    children:
      'Lorem Ipsum is simply dummy Heading of the printing and typesetting industry.',
    fontFamily: 'heading',
    level: 1,
  },
});

export const All = meta.story({
  render: (args) => (
    <Stack gap={2}>
      <Heading {...args} level={1}>
        Heading 1
      </Heading>
      <Heading {...args} level={2}>
        Heading 2
      </Heading>
      <Heading {...args} level={3}>
        Heading 3
      </Heading>
      <Heading {...args} level={4}>
        Heading 4
      </Heading>
    </Stack>
  ),
  args: {
    children: null,
  },
});

export const Colors = meta.story({
  render: (args) => (
    <Stack gap={2}>
      <Heading {...args} level={2} color="default">
        Default text role
      </Heading>
      <Heading {...args} level={2} color="muted">
        Muted text role
      </Heading>
      <Heading {...args} level={2} color="primary-700">
        Palette color primary-700
      </Heading>
    </Stack>
  ),
  args: {
    children: null,
  },
});

export const Overflow = meta.story({
  render: (args) => (
    <Stack gap={4} style={{ maxInlineSize: 320 }}>
      <Heading {...args} level={3} lineClamp={2}>
        A long heading that is clamped to two lines and ends in an ellipsis when
        it runs out of room
      </Heading>
      <Heading {...args} level={3} truncate>
        A long heading that stays on one line and ends in an ellipsis
      </Heading>
    </Stack>
  ),
  args: {
    children: null,
  },
});
