// TODO Where to put this?

export const justifyContentMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
} as const;

export type JustifyContentMap = typeof justifyContentMap;

export const alignItemsMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  stretch: 'stretch',
} as const;

export type AlignItemsMap = typeof alignItemsMap;
