import { expect } from '@storybook/jest';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { vars } from '../../lib/css/theme/vars.css';
import { Box } from '../Box';
import { Stack, StackProps } from './Stack';

export default {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    gap: 'small',
  },
  argTypes: {
    gap: {
      name: 'gap',
      type: 'string',
      control: 'select',
      options: Object.keys(vars.space),
    },
    children: {
      control: {
        type: 'none',
      },
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
    gap: ['small', 'medium', 'large'],
    children: (
      <>
        <Box backgroundColor="caution" padding="small">
          1
        </Box>
        <Box backgroundColor="caution" padding="small">
          2
        </Box>
        <Box backgroundColor="caution" padding="small">
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
    gap: ['small', 'medium', 'large'],
    as: 'ol',
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
