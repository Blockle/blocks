import { Meta, StoryObj } from '@storybook/react';
import { expect, screen } from '@storybook/test';
import { VisuallyHidden, VisuallyHiddenProps } from './VisuallyHidden';

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
  play: async ({ args }) => {
    expect(screen.getByText(args.children as string)).toBeInTheDocument();
  },
};
