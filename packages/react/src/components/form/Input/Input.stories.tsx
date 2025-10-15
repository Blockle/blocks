import type { Meta, StoryObj } from '@storybook/react';

import { Input, type InputProps } from './Input.js';

export default {
  title: 'Form/Input',
  component: Input,
} as Meta<typeof Input>;

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: 'Placeholder',
  },
};
