import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
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
