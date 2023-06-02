import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Box, BoxProps } from './Box';

export default {
  title: 'Layout/Box',
  component: Box,
  argTypes: {},
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
    padding: ['small', 'medium', 'large'],
  },
};
