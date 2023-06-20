import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { responsiveProperties } from '../../css/sprinkles.css';
import { vars } from '../../css/theme.css';
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
      options: Object.keys(vars.fontSize),
      control: {
        type: 'select',
      },
    },
    textAlign: {
      name: 'textAlign',
      type: 'string',
      options: Object.keys(responsiveProperties.styles.textAlign.values),
      control: {
        type: 'select',
      },
    },
    lineHeight: {
      name: 'lineHeight',
      type: 'string',
      options: Object.keys(responsiveProperties.styles.lineHeight.values),
      control: {
        type: 'select',
      },
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
    fontFamily: 'body',
    as: 'span',
  },
};
