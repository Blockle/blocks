import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText(args.children as string)).toBeInTheDocument();
  },
};
