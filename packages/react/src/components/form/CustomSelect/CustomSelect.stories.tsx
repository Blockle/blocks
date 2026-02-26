import preview from '../../../../../../.storybook/preview.js';
import { CustomSelect } from './CustomSelect.js';

const meta = preview.meta({
  title: 'Form/CustomSelect',
  component: CustomSelect,
});

export const Default = meta.story({
  args: {
    name: 'checkbox',
    children: 'Checkbox Label',
  },
});
