import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from './Text.js';

const meta = preview.meta({
  title: 'Typography/Text',
  component: Text,
  argTypes: {
    color: {
      name: 'color',
      control: 'select',
      options: ['default', 'muted', 'disabled', 'inverse', 'primary-700'],
    },
    fontSize: {
      name: 'fontSize',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.fontSize.values),
    },
    textAlign: {
      name: 'textAlign',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.textAlign.values),
    },
    lineHeight: {
      name: 'lineHeight',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.lineHeight.values),
    },
    letterSpacing: {
      name: 'letterSpacing',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.letterSpacing.values),
    },
  },
});

export const Default = meta.story({
  args: {
    ref: null,
    children:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  },
});

export const Colors = meta.story({
  render: (args) => (
    <Stack gap={2}>
      <Text {...args} color="default">
        Default text role
      </Text>
      <Text {...args} color="muted">
        Muted text role
      </Text>
      <Text {...args} color="disabled">
        Disabled text role
      </Text>
      <Text {...args} color="primary-700">
        Palette color primary-700 (does not change with the Color mode)
      </Text>
    </Stack>
  ),
  args: {
    ref: null,
    children: null,
  },
});
