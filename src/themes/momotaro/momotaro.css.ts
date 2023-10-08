import { makeTheme } from '../../lib/css/theme/makeTheme';
import { components } from './components';
import { tokens } from './tokens.css';

export const momotaro = makeTheme({
  name: 'momotaro',
  tokens,
  components,
});
