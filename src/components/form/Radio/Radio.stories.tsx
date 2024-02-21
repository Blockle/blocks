import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioProps } from './Radio';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'Form/Radio',
  component: Radio,
} as Meta;

export const Default: StoryObj<RadioProps> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ name, value, ...props }) => {
    return (
      <>
        <label id="radio-group">Radio group</label>
        <RadioGroup aria-labelledby="radio-group">
          <Radio name="radio-group" value="a" label="Radio a" {...props} />
          <Radio name="radio-group" value="b" label="Radio b" />
          <Radio name="radio-group" value="c" label="Radio c" />
        </RadioGroup>
      </>
    );
  },
};
