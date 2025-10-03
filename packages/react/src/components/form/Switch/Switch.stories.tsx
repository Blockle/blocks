import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../../layout/Box/Box.js';
import { Switch, type SwitchProps } from './Switch.js';

export default {
  title: 'Form/Switch',
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
