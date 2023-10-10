import { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioProps } from './Radio';
import { RadioGroup } from './RadioGroup';
import { Text } from '../Text';

export default {
  title: 'DataEntry/Radio',
  component: Radio,
} as Meta;

export const Default: StoryObj<RadioProps> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ name, value, ...props }) => {
    return (
      <>
        <label id="radio-group">Radio group</label>
        <RadioGroup aria-labelledby="radio-group">
          <label>
            <Radio name="radio-group" value="a" {...props} />
            <Text>Radio A</Text>
          </label>
          <label>
            <Radio name="radio-group" value="b" />
            <Text>Radio B</Text>
          </label>
        </RadioGroup>
      </>
    );
  },
};
