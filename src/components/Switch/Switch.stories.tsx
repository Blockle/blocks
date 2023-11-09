import { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'DataEntry/Switch',
  component: Switch,
} as Meta;

export const Default: StoryObj<SwitchProps> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render: ({ ...props }) => {
    return (
      <Box display="flex" gap="medium" alignItems="center">
        <label htmlFor="switch">Switch label</label>
        <Switch id="switch" {...props} />
      </Box>
    );
  },
};
