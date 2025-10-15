import type { Meta, StoryObj } from '@storybook/react';

import { Select, type SelectProps } from './Select.js';

export default {
  title: 'Form/Select',
  component: Select,
} as Meta<typeof Select>;

export const Default: StoryObj<SelectProps> = {
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
