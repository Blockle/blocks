/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../form/Button';
import { Box } from '../../layout/Box';
import { Tooltip, TooltipProps } from './Tooltip';

export default {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  argTypes: {},
} as Meta;

export const Default: StoryObj<TooltipProps> = {
  render(props) {
    return (
      <Box style={{ height: 1000, width: 1000 }}>
        <Box style={{ marginTop: 240, marginLeft: 240 }}>
          <Tooltip {...props}>
            <Button variant="outline">Hover me</Button>
          </Tooltip>
        </Box>
      </Box>
    );
  },

  args: {
    label: 'Hi there',
  },
};
