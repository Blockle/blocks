import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { vars } from '../../../lib/theme/vars.css';
import { Box } from '../Box';
import { Stack, type StackProps } from './Stack';

export default {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    spacing: 'small',
  },
  argTypes: {
    spacing: {
      name: 'gap',
      type: 'string',
      control: 'select',
      options: Object.keys(vars.space),
    },
  },
} as Meta<typeof Stack>;

const Template: StoryFn<typeof Stack> = ({ ...args }) => <Stack {...args} />;

export const Default: StoryObj<StackProps> = {
  render: Template,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('3')).toBeInTheDocument();
  },

  args: {
    space: ['small', 'medium', 'large'],
    children: (
      <>
        <Box backgroundColor="danger" padding="small">
          1
        </Box>
        <Box backgroundColor="danger" padding="small">
          2
        </Box>
        <Box backgroundColor="danger" padding="small">
          3
        </Box>
      </>
    ),
  },
};

export const List: StoryObj<StackProps> = {
  render: Template,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('1')).toBeInTheDocument();
    expect(canvas.getByText('4')).toBeInTheDocument();
  },

  args: {
    space: ['small', 'medium', 'large'],
    tag: 'ol',
    children: (
      <>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </>
    ),
  },
};
