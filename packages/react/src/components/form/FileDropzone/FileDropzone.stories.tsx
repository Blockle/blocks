import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileDropzone, type FileDropzoneProps } from './FileDropzone.js';

export default {
  title: 'Form/FileDropzone',
  component: FileDropzone,
} as Meta;

export const Default: StoryObj<FileDropzoneProps> = {
  render: (props) => {
    return <FileDropzone {...props} />;
  },
};
