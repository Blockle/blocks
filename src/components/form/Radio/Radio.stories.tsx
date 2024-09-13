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
};

export const WithRadioGroup: StoryObj<RadioProps> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ name, value, ...props }) => {
    return (
      <>
        <label id="radio-group">Radio group</label>
        <RadioGroup aria-labelledby="radio-group">
          <Stack spacing="medium">
            <Radio name="radio-group" value="a" {...props}>
              Radio A
            </Radio>
            <Radio name="radio-group" value="b">
              Radio B
            </Radio>
            <Radio name="radio-group" value="c">
              Radio C
            </Radio>
          </Stack>
        </RadioGroup>
      </>
    );
  },
};
