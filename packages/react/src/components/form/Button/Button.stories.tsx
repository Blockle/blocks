import type { Meta, StoryObj } from '@storybook/react';
import * as test from '@storybook/test';
import { expect, userEvent, within } from '@storybook/test';
// import { Icon } from '../Icon';
import { Button, type ButtonProps } from './Button';

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
    onClick: test.fn(() => {
      console.log('Button clicked');
    }),
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
    onClick: test.fn((event) => {
      event.preventDefault();
      console.log('Link clicked and default prevented');
    }),
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

export const Play: StoryObj<ButtonProps> = {
  render: (props) => {
    return <Button {...props} />;
  },

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));

    expect(args.onClick).toHaveBeenCalled();
  },

  args: {
    children: 'Button',
    onClick: test.fn(() => {
      console.log('Button clicked');
    }),
  },
};
