import { pixelsToRem, type ThemeTokens } from '@blockle/blocks-core';

export const tokens: ThemeTokens = {
  border: {
    radius: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
    },
    width: {
      thin: '1px',
      thick: '2px',
    },
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '16px',
    4: '24px',
    5: '32px',
    6: '40px',
    7: '48px',
    8: '64px',
  },
  transition: {
    slow: '240ms',
    normal: '120ms',
    fast: '80ms',
  },
  typography: {
    fontFamily: {
      body: '"Rubik", sans-serif',
      heading: '"Rubik", sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xsmall: pixelsToRem(12),
      small: pixelsToRem(14),
      medium: pixelsToRem(16),
      large: pixelsToRem(20),
      xlarge: pixelsToRem(24),
      display: 'clamp(2rem, 1.5rem + 2.5vw, 3.5rem)',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      strong: 700,
      bold: 800,
    },
    lineHeight: {
      compact: 1.1,
      snug: 1.3,
      normal: 1.5,
      relaxed: 1.7,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
    },
  },
};
