import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Textarea } from './Textarea.js';

describe('Textarea', () => {
  it('should render with storybook', () => {
    render(
      <label htmlFor="textarea">
        <span>Textarea label</span>
        <Textarea id="textarea" />
      </label>,
    );

    expect(screen.getByLabelText('Textarea label')).toBeInTheDocument();
  });
});
