import type { Meta, StoryObj } from '@storybook/react-vite';

import { NumericInput, type NumericInputProps } from './NumericInput.js';

export default {
  title: 'Form/NumericInput',
  component: NumericInput,
} as Meta;

export const Default: StoryObj<NumericInputProps> = {
  render: (props) => {
    return <NumericInput {...props} />;
  },
  args: {
    defaultValue: '123',
  },
};
