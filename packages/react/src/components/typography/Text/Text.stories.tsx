import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Text, type TextProps } from './Text.js';

export default {
  title: 'Typography/Text',
  component: Text,
  args: {
    fontSize: 'small',
  },
  argTypes: {
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
  },
} as Meta<typeof Text>;

export const Default: StoryObj<TextProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText(
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      ),
    ).toBeInTheDocument();
  },

  args: {
    children:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    fontFamily: 'primary',
    tag: 'span',
  },
};
