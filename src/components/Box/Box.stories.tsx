import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { responsiveProperties, unresponsiveProperties } from '../../lib/css/atoms/atomicProperties';
import { Box, BoxProps } from './Box';

export default {
  title: 'Layout/Box',
  component: Box,
  argTypes: {
    color: {
      control: 'select',
      options: Object.keys(unresponsiveProperties.color),
    },
    backgroundColor: {
      control: 'select',
      options: Object.keys(unresponsiveProperties.color),
    },
    padding: {
      control: 'select',
      options: Object.keys(responsiveProperties.paddingBottom),
    },
  },
} as Meta;

export const Default: StoryObj<BoxProps> = {
  render: (props) => {
    return <Box {...props} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Box')).toBeInTheDocument();
  },
  args: {
    children: 'Box',
  },
};
