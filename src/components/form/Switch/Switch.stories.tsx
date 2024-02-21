import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../layout/Box';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'DataEntry/Switch',
  component: Switch,
} as Meta;

export const Default: StoryObj<SwitchProps> = {
  render: ({ ...props }) => {
    return (
      <Box display="flex" gap="medium" alignItems="center">
        <label htmlFor="switch">Switch label</label>
        <Switch id="switch" {...props} />
      </Box>
    );
  },
  args: {
    onChange: (value) => console.log('onChange', value),
  },
};
