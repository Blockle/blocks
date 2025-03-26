import {
  responsiveProperties,
  unresponsiveProperties,
  vars,
} from '@blockle/blocks-core';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Text, type TextProps } from './Text';

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
      options: Object.keys(vars.fontSize),
    },
    textAlign: {
      name: 'textAlign',
      type: 'string',
      control: 'select',
      options: responsiveProperties.textAlign,
    },
    lineHeight: {
      name: 'lineHeight',
      type: 'string',
      control: 'select',
      options: Object.keys(unresponsiveProperties.lineHeight),
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
