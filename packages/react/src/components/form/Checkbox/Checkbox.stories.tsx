import preview from '../../../../../../.storybook/preview.js';
import { Checkbox } from './Checkbox.js';

const meta = preview.meta({
  title: 'Form/Checkbox',
  component: Checkbox,
});

export const Default = meta.story({
  args: {
    name: 'checkbox',
    children: 'Checkbox Label',
  },
});
