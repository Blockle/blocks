import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Button, type ButtonProps } from './Button.js';

export default {
  title: 'Form/Button',
  component: Button,
  argTypes: {},
} as Meta;

export const Default: StoryObj<ButtonProps> = {
  render: (props) => {
    return <Button {...props} />;
  },

  args: {
    children: 'Button',
    onClick: action('button-clicked'),
  },
};

export const LinkButton: StoryObj<ButtonProps> = {
  render: (props) => {
    return <Button {...props} />;
  },

  args: {
    children: (
      <a href="https://google.com" target="_blank" rel="noreferrer">
        Link text
      </a>
    ),
    asChild: true,
    onClick: action('link-clicked'),
  },
};

// export const WithIcon: StoryObj<ButtonProps> = {
//   render: (props) => {
//     return (
//       <Stack gap="medium">
//         <Button startSlot={<Icon icon="star" />} {...props} />
//         <Button endSlot={<Icon icon="star" />} {...props} />
//         <Button startSlot={<Icon icon="star" />} endSlot={<Icon icon="star" />} {...props} />
//       </Stack>
//     );
//   },

//   args: {
//     children: 'Button',
//     onClick: jest.fn(() => {
//       console.log('Button clicked');
//     }),
//   },
// };
