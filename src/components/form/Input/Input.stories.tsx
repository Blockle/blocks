import { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './Input';

export default {
  title: 'Form/Input',
  component: Input,
} as Meta<typeof Input>;

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: 'Placeholder',
  },
};
