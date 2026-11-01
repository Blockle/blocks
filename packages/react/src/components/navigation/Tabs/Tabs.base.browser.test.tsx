import { vars } from '@blockle/blocks-core';
import { describe } from 'vitest';

import { testingTheme } from '../../../testUtils/testTheme.css.js';
import { describeTabsMechanics } from './Tabs.mechanics.suite.js';

// The bare testTheme sets only the Tab indicator's look, so these pass only
// because Blocks' base styles carry the mechanics. Its own file: a theme's
// Color roles are global, and would recolour momotaro's tests.
describe('Tabs under a theme that sets only the look (browser)', () => {
  describeTabsMechanics({
    theme: testingTheme,
    indicator: { color: vars.colorRole.danger.solid, thickness: '3px' },
  });
});
