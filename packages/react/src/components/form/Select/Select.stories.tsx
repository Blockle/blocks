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

export const Sizes = meta.story({
  render: () => (
    <>
      <Select aria-label="Small" size="small">
        <option value="1">Small</option>
      </Select>
      <Select aria-label="Medium" size="medium">
        <option value="1">Medium</option>
      </Select>
      <Select aria-label="Large" size="large">
        <option value="1">Large</option>
      </Select>
    </>
  ),
});
