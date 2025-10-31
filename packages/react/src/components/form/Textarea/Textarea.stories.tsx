import type { Meta, StoryObj } from '@storybook/react-vite';

import { Stack } from '../../layout/Stack/Stack.js';
import { Textarea, type TextareaProps } from './Textarea.js';

export default {
  title: 'Form/Textarea',
  component: Textarea,
} as Meta;

export const Default: StoryObj<TextareaProps> = {
  render: ({ ...props }) => {
    return (
      <Stack gap={2}>
        <label htmlFor="textarea">Textarea label</label>
        <Textarea id="textarea" {...props} />
      </Stack>
    );
  },
  args: {
    placeholder: 'Type your text here...',
  },
};
