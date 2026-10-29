import { action } from 'storybook/actions';

import preview from '../../../../../../.storybook/preview.js';
import { Alert } from './Alert.js';

const meta = preview.meta({
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    intent: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
});

export const Default = meta.story({
  render: (props) => {
    return <Alert {...props} />;
  },

  args: {
    children: 'This is an alert message.',
    intent: 'info',
    onRequestClose: action('onRequestClose'),
    closeLabel: 'Close',
  },
});
