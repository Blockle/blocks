import { render as rtlRender, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { describe, expect, it } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { ToastProvider } from '../../feedback/Toast/ToastProvider.js';
import { useToast } from '../../feedback/Toast/useToast.js';
import { Checkbox } from '../../form/Checkbox/Checkbox.js';
import { NumericInput } from '../../form/NumericInput/NumericInput.js';
import { Select } from '../../form/Select/Select.js';
import { type BlocksIcons, BlocksProvider } from './BlocksProvider.js';

const defaultPaths = {
  check: 'm4.5 12.75 6 6 9-13.5',
  minus: 'M5 12h14',
  plus: 'M12 5v14M5 12h14',
  close: 'M18 6 6 18M6 6l12 12',
};

const customIcon = (name: string) => (
  <svg data-testid={`custom-${name}`} viewBox="0 0 24 24" />
);

const customIcons: BlocksIcons = {
  check: customIcon('check'),
  chevronDown: customIcon('chevronDown'),
  minus: customIcon('minus'),
  plus: customIcon('plus'),
  close: customIcon('close'),
};

const ShowToast: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast({ id: 'saved', children: 'Saved' });
  }, [showToast]);

  return null;
};

const Components: React.FC = () => (
  <>
    <Checkbox defaultChecked>Agree</Checkbox>
    <Select aria-label="Fruit">
      <option>Apple</option>
    </Select>
    <NumericInput label="Amount" />
    <ToastProvider>
      <ShowToast />
    </ToastProvider>
  </>
);

const iconIn = (element: HTMLElement) => {
  const svg = element.querySelector('svg');

  expect(svg).not.toBeNull();

  return svg as SVGSVGElement;
};

const checkboxIcon = () =>
  iconIn(
    screen.getByRole('checkbox', { name: 'Agree' })
      .parentElement as HTMLElement,
  );

const selectIcon = () =>
  iconIn(
    screen.getByRole('combobox', { name: 'Fruit' })
      .parentElement as HTMLElement,
  );

const buttonIcon = (name: string) =>
  iconIn(screen.getByRole('button', { name }));

const toastIcon = async () =>
  iconIn(await screen.findByRole('button', { name: 'Close' }));

describe('BlocksProvider icons', () => {
  it('shows the default icons without icons', async () => {
    rtlRender(
      <BlocksProvider theme={testingTheme}>
        <Components />
      </BlocksProvider>,
    );

    expect(checkboxIcon().querySelector('path')).toHaveAttribute(
      'd',
      defaultPaths.check,
    );
    expect(selectIcon().querySelector('path')).toHaveAttribute('d');
    expect(buttonIcon('Decrease').querySelector('path')).toHaveAttribute(
      'd',
      defaultPaths.minus,
    );
    expect(buttonIcon('Increase').querySelector('path')).toHaveAttribute(
      'd',
      defaultPaths.plus,
    );
    expect((await toastIcon()).querySelector('path')).toHaveAttribute(
      'd',
      defaultPaths.close,
    );
  });

  it('replaces each built-in icon with the one passed in icons', async () => {
    rtlRender(
      <BlocksProvider theme={testingTheme} icons={customIcons}>
        <Components />
      </BlocksProvider>,
    );

    expect(checkboxIcon()).toHaveAttribute('data-testid', 'custom-check');
    expect(selectIcon()).toHaveAttribute('data-testid', 'custom-chevronDown');
    expect(buttonIcon('Decrease')).toHaveAttribute(
      'data-testid',
      'custom-minus',
    );
    expect(buttonIcon('Increase')).toHaveAttribute(
      'data-testid',
      'custom-plus',
    );
    expect(await toastIcon()).toHaveAttribute('data-testid', 'custom-close');
  });

  it('keeps the default for a key that is not passed', () => {
    rtlRender(
      <BlocksProvider theme={testingTheme} icons={{ plus: customIcon('plus') }}>
        <NumericInput label="Amount" />
      </BlocksProvider>,
    );

    expect(buttonIcon('Increase')).toHaveAttribute(
      'data-testid',
      'custom-plus',
    );
    expect(buttonIcon('Decrease').querySelector('path')).toHaveAttribute(
      'd',
      defaultPaths.minus,
    );
  });

  it('merges a nested provider’s icons over its parent’s', () => {
    rtlRender(
      <BlocksProvider
        theme={testingTheme}
        icons={{ minus: customIcon('minus'), plus: customIcon('plus') }}
      >
        <BlocksProvider
          theme={testingTheme}
          icons={{ plus: <svg data-testid="inner-plus" /> }}
        >
          <NumericInput label="Amount" />
        </BlocksProvider>
      </BlocksProvider>,
    );

    expect(buttonIcon('Increase')).toHaveAttribute('data-testid', 'inner-plus');
    expect(buttonIcon('Decrease')).toHaveAttribute(
      'data-testid',
      'custom-minus',
    );
  });

  it('hides each icon from assistive technology and keeps the control names', async () => {
    rtlRender(
      <BlocksProvider theme={testingTheme} icons={customIcons}>
        <Components />
      </BlocksProvider>,
    );

    const icons = [
      checkboxIcon(),
      selectIcon(),
      buttonIcon('Decrease'),
      buttonIcon('Increase'),
      await toastIcon(),
    ];

    for (const icon of icons) {
      expect(icon.closest('[aria-hidden="true"]')).not.toBeNull();
    }

    expect(screen.getByRole('checkbox')).toHaveAccessibleName('Agree');
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });
});
