import { atomicProperties } from '@blockle/blocks-core';

import preview from '../../../../../../.storybook/preview.js';
import { Inline } from '../../layout/Inline/Inline.js';
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

const longText =
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

export const LineClamp = meta.story({
  args: {
    ref: null,
    lineClamp: 2,
    children: longText,
  },
  argTypes: {
    lineClamp: { control: 'select', options: [1, 2, 3, 4, 5] },
  },
  render: (args) => (
    <div style={{ maxInlineSize: 320 }}>
      <Text {...args} />
    </div>
  ),
});

export const Truncate = meta.story({
  args: {
    ref: null,
    children: null,
  },
  render: (args) => (
    <Stack gap={4}>
      <div style={{ maxInlineSize: 320 }}>
        <Text {...args} truncate>
          {longText}
        </Text>
      </div>
      <div
        style={{
          display: 'flex',
          inlineSize: 320,
          minInlineSize: 120,
          maxInlineSize: '100%',
          overflow: 'hidden',
          resize: 'horizontal',
          outline: '1px dashed currentColor',
        }}
      >
        <Inline gap={2} flexWrap="nowrap" minInlineSize={0}>
          <Text {...args}>Projects</Text>
          <Text {...args} color="muted">
            /
          </Text>
          <Text {...args} truncate>
            A very long current page name that gives way with an ellipsis
          </Text>
        </Inline>
      </div>
    </Stack>
  ),
});
