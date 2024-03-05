import { style } from '../../../lib/css/style/style';
import { makeComponentTheme } from '../../../lib/theme/makeComponentTheme';
import { focusable } from './helpers.css';

export const slider = makeComponentTheme('slider', {
  base: style({
    blockSize: '20px',
    inlineSize: '200px',
  }),
  track: style({
    blockSize: '4px',
    backgroundColor: 'primaryLight',
    borderRadius: 'small',
  }),
  filledTrack: style({
    backgroundColor: 'primary',
  }),
  thumb: style([
    {
      backgroundColor: 'primary',
      borderRadius: '50%',
      height: '16px',
      width: '16px',
    },
    focusable,
  ]),
});
