import preview from '../../../../../../.storybook/preview.js';
import { VisuallyHidden } from './VisuallyHidden.js';

const meta = preview.meta({
  title: 'Accessibility/VisuallyHidden',
  component: VisuallyHidden,
});

export const Default = meta.story({
  args: {
    children: 'This text is visually hidden but accessible to screen readers.',
  },
});
