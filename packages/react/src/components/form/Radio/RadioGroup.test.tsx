import { describe, expect, it } from 'vitest';

import { render, screen } from '../../../testUtils/testUtils.js';
import { RadioGroup } from './RadioGroup.js';

describe('RadioGroup', () => {
  it('should render', () => {
    render(
      <RadioGroup>
        <input type="radio" name="groupName" value="r1" />
        <input type="radio" name="groupName" value="r2" />
      </RadioGroup>,
    );

    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });
});
