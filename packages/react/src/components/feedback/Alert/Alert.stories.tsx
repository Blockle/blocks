import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Alert } from './Alert.js';

const meta = preview.meta({
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {},
});

export const Default = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'This is an alert message.',
    open: true,
    onRequestClose: action('onRequestClose'),
  },
});
