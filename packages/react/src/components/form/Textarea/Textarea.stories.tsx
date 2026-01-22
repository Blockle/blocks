import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Textarea } from './Textarea.js';

const meta = preview.meta({
  title: 'Form/Textarea',
  component: Textarea,
});

export const Default = meta.story({
  render: ({ ...props }) => {
    return (
      <Stack gap={2}>
        <label htmlFor="textarea">Textarea label</label>
        <Textarea id="textarea" {...props} />
      </Stack>
    );
  },
  args: {
    name: 'textarea',
    placeholder: 'Type your text here...',
  },
});
