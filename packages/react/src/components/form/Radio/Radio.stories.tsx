import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../layout/Stack/Stack.js';
import { Text } from '../../typography/Text/Text.js';
import { Radio, type RadioProps } from './Radio.js';
import { RadioGroup } from './RadioGroup.js';

export default {
  title: 'Form/Radio',
  component: Radio,
} as Meta;

export const Default: StoryObj<RadioProps> = {
  render: (props) => {
    return <Radio {...props} />;
  },
};

export const WithRadioGroup: StoryObj<RadioProps> = {
  render: ({ name, value, ...props }) => {
    return (
      <Stack spacing="medium">
        <Text id="radio-group">What is your favorite food?</Text>

        <RadioGroup aria-labelledby="radio-group">
          <Stack spacing="small">
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
};
