import { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../layout/Stack';
import { Radio, RadioProps } from './Radio';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'Form/Radio',
  component: Radio,
} as Meta;

export const Default: StoryObj<RadioProps> = {
  render: (props) => {
    return <Radio {...props} />;
  },
  args: {
    children: 'Radio',
  },
};

export const WithRadioGroup: StoryObj<RadioProps> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ name, value, ...props }) => {
    return (
      <Stack spacing="medium">
        <label id="radio-group">What is your favorite food?</label>

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
