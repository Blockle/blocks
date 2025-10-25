import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../form/Button/Button.js';
import { Box } from '../../layout/Box/Box.js';
import { Tooltip, type TooltipProps } from './Tooltip.js';

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
    content: 'Hi there',
  },
};
