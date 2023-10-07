import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { responsiveProperties, unresponsiveProperties } from '../../lib/css/atoms/atomicProperties';
import { vars } from '../../lib/css/theme/vars.css';
import { Text, TextProps } from './Text';

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
    children: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    fontFamily: 'primary',
    as: 'span',
  },
};
