import preview from '../../../../../../.storybook/preview.js';
import { NumericInput } from './NumericInput.js';

const meta = preview.meta({
  title: 'Form/NumericInput',
  component: NumericInput,
});

export const Default = meta.story({
  args: {
    name: 'number-input',
  },
});
