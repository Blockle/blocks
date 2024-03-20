import { Meta, StoryObj } from '@storybook/react';
import { Divider, DividerProps } from './Divider';

// export default {
//   title: 'Display/Divider',
//   component: Divider,
// } as Meta;

const meta: Meta<typeof Divider> = {
  title: 'Display/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<DividerProps>;

export const Default: Story = {};
