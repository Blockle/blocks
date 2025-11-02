import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput, type TextInputProps } from './TextInput.js';

export default {
  title: 'Form/TextInput',
  component: TextInput,
} as Meta<typeof TextInput>;

export const Default: StoryObj<TextInputProps> = {
  args: {
    placeholder: 'Placeholder',
  },
};
