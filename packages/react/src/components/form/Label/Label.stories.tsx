import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { TextInput } from '../TextInput/TextInput.js';
import { Label } from './Label.js';

const meta = preview.meta({
  title: 'Form/Label',
  component: Label,
});

export const Default = meta.story({
  args: {
    children: 'Label text',
  },
});

export const WithInput = meta.story({
  render: (props) => {
    return (
      <Stack gap={2}>
        <Label {...props} />
        <TextInput
          name="input"
          defaultValue="input"
          type="text"
          id={props.htmlFor}
        />
      </Stack>
    );
  },
  args: {
    children: 'Label text',
    htmlFor: 'input',
  },
});
