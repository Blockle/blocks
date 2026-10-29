export const justifyContentMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
} as const;

export type JustifyContentMap = typeof justifyContentMap;

export const alignItemsMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
} as const;

export type AlignItemsMap = typeof alignItemsMap;
