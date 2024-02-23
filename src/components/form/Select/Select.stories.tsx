import { expect } from '@storybook/jest';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { Select, SelectProps } from './Select';

export default {
  title: 'Form/Select',
  component: Select,
} as Meta<typeof Select>;

export const Default: StoryObj<SelectProps> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText('Placeholder')).toBeInTheDocument();
  },

  args: {
    placeholder: 'Placeholder',
    children: (
      <>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </>
    ),
  },
};
