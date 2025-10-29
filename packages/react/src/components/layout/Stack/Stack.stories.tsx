import { atomicProperties } from '@blockle/blocks-core';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Box } from '../Box/Box.js';
import { Stack, type StackProps } from './Stack.js';

export default {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    gap: 1,
  },
  argTypes: {
    gap: {
      name: 'gap',
      type: 'string',
      control: 'select',
      options: Object.keys(atomicProperties.gap.values),
    },
  },
} as Meta<typeof Stack>;

const Template: StoryFn<typeof Stack> = ({ ...args }) => <Stack {...args} />;

export const Default: StoryObj<StackProps> = {
  render: Template,
  args: {
    children: (
      <>
        <Box backgroundColor="danger-700" padding={2}>
          1
        </Box>
        <Box backgroundColor="danger-600" padding={2}>
          2
        </Box>
        <Box backgroundColor="danger-500" padding={2}>
          3
        </Box>
      </>
    ),
  },
};

export const List: StoryObj<StackProps> = {
  render: Template,
  args: {
    children: (
      <>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          1
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          2
        </li>
        <li style={{ border: '1px red solid', width: '60px', height: '60px' }}>
          3
        </li>
      </>
    ),
    tag: 'ol',
  },
};
