import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from '../../typography/Heading/Heading.js';
import { Divider, type DividerProps } from './Divider.js';

const meta: Meta<typeof Divider> = {
  title: 'Display/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<DividerProps>;

export const Default: Story = {};

export const WithText: Story = {
  render: (args) => (
    <Divider {...args}>
      <Heading level={3}>Section 1</Heading>
    </Divider>
  ),
  args: {
    alignment: 'start',
  },
};
