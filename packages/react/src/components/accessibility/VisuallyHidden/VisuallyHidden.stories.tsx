import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden, type VisuallyHiddenProps } from './VisuallyHidden.js';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Display/VisuallyHidden',
  component: VisuallyHidden,
};

export default meta;

type Story = StoryObj<VisuallyHiddenProps>;

export const Default: Story = {
  args: {
    children: 'This text is visually hidden',
  },
};
