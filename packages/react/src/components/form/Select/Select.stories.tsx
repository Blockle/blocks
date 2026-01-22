import preview from '../../../../../../.storybook/preview.js';
import { Select } from './Select.js';

const meta = preview.meta({
  title: 'Form/Select',
  component: Select,
});

export const Default = meta.story({
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
});
