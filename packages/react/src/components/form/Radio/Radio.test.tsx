import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { Radio } from './Radio.js';

describe('Label', () => {
  it('should render', () => {
    render(<Radio name="option" value="option-1" />);

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('should render with label when children are passed in', () => {
    render(
      <Radio name="option" value="option-1">
        My label text
      </Radio>,
    );

    expect(screen.getByLabelText('My label text')).toBeInTheDocument();
  });
});
