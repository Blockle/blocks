import preview from '../../../../../../.storybook/preview.js';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Radio } from './Radio.js';
import { RadioGroup } from './RadioGroup.js';

const meta = preview.meta({
  title: 'Form/Radio',
  component: Radio,
  args: {
    name: 'radio',
    value: 'option1',
  },
});

export const Default = meta.story();

export const WithRadioGroup = meta.story({
  render: ({ name, value, ...props }) => {
    return (
      <Stack gap={2}>
        <Text id="radio-group">What is your favorite food?</Text>

        <RadioGroup aria-labelledby="radio-group">
          <Stack gap={1}>
            <Radio name="radio-a" value="a" {...props}>
              Apples
            </Radio>
            <Radio name="radio-a" value="b">
              Bananas
            </Radio>
            <Radio name="radio-a" value="c">
              Carrots
            </Radio>
          </Stack>
        </RadioGroup>
      </Stack>
    );
  },
});
