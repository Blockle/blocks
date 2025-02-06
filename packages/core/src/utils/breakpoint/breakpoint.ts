export const breakpointNames = ['mobile', 'tablet', 'desktop', 'wide'] as const;

export const breakpoints = {
  mobile: 0,
  tablet: 740,
  desktop: 992,
  wide: 1200,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export function minMediaQuery(breakpoint: Exclude<Breakpoint, 'mobile'>) {
  return `screen and (min-width: ${breakpoints[breakpoint]}px)`;
}
