import preview from '../../../../../../.storybook/preview.js';
import { TextInput } from './TextInput.js';

export const meta = preview.meta({
  title: 'Form/TextInput',
  component: TextInput,
});

export const Default = meta.story({
  args: {
    name: 'text-input',
    placeholder: 'Placeholder',
  },
});
