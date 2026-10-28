import { style } from '@vanilla-extract/css';
import type { Properties as CSSProperties } from 'csstype';

import {
  type ColorMode,
  colorModeAttribute,
  colorModes,
  systemColorModeQueries,
  systemFallbackColorMode,
} from '../config/colorMode.js';
import { layers } from '../css/layers.css.js';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K] extends unknown[]
      ? DeepPartial<T[K][number]>[]
      : T[K];
};

type MapArray<T extends unknown[], V> = {
  [Index in keyof T]: V;
};

type AtomicPrimitiveValue = string | number;
type AtomicProperty =
  | AtomicPrimitiveValue[]
  | Record<string, AtomicPrimitiveValue>;

type Properties = Partial<Record<keyof CSSProperties, AtomicProperty>>;

type PropertyCondition = { '@media'?: string };
type PropertyConditions = PropertyCondition[];

type PropertyDefinition<TProperties, TConditions, TModeKey> = {
  properties: TProperties;
  conditions?: TConditions;
  /**
   * Properties that also accept a Mode value. Each of their values gets one
   * class per Color mode (`modeClasses`), scoped to `data-color-mode`.
   */
  modeProperties?: TModeKey[];
};

type ModeClasses<TKey, TModeKey> = [TKey] extends [TModeKey]
  ? { modeClasses: Record<ColorMode, string> }
  : unknown;

type PropertyResultValue<TConditions> = TConditions extends unknown[]
  ? {
      defaultClass: string;
      conditions: TConditions extends unknown[]
        ? MapArray<TConditions, string>
        : never;
    }
  : {
      defaultClass: string;
    };

type PropertyResult<
  TProperties extends Properties,
  TConditions,
  TModeKey = never,
> = {
  [K in keyof TProperties]: {
    values: TProperties[K] extends AtomicPrimitiveValue[]
      ? {
          [V in TProperties[K][number]]: PropertyResultValue<TConditions> &
            ModeClasses<K, TModeKey>;
        }
      : {
          [V in keyof TProperties[K]]: PropertyResultValue<TConditions> &
            ModeClasses<K, TModeKey>;
        };
  };
};

export function defineProperties<
  const TProperties extends Properties,
  TConditions extends PropertyConditions | undefined,
  const TModeKey extends keyof TProperties = never,
>({
  properties,
  conditions,
  modeProperties,
}: PropertyDefinition<TProperties, TConditions, TModeKey>): PropertyResult<
  TProperties,
  TConditions,
  TModeKey
> {
  const result: DeepPartial<PropertyResult<TProperties, TConditions>> = {};

  const isModeProperty = (property: string) =>
    (modeProperties as string[] | undefined)?.includes(property) ?? false;

  for (const property in properties) {
    const values = properties[property];

    const propertyResult = {
      values: {} as Record<
        string,
        {
          defaultClass: string;
          conditions?: string[];
          modeClasses?: Record<ColorMode, string>;
        }
      >,
    };

    if (Array.isArray(values)) {
      for (const value of values) {
        const defaultClass = style({
          '@layer': {
            [layers.atom]: {
              [property]: value,
            },
          },
        });

        const propResult = {
          defaultClass,
        } as PropertyResultValue<unknown[]> & {
          modeClasses?: Record<ColorMode, string>;
        };

        if (isValidConditionList(conditions)) {
          propResult.conditions = conditions.map((condition, i) => {
            if (i === 0 && Object.keys(condition).length === 0) {
              return defaultClass;
            }

            if (typeof condition === 'object' && condition['@media']) {
              return style({
                '@layer': {
                  [layers.atom]: {
                    '@media': {
                      [condition['@media']]: {
                        [property]: value,
                      },
                    },
                  },
                },
              });
            }

            throw new Error(
              `Invalid condition for ${property}: ${JSON.stringify(condition)}`,
            );
          });
        }

        if (isModeProperty(property)) {
          propResult.modeClasses = makeModeClasses(property, value);
        }

        propertyResult.values[value] = propResult;
      }

      result[property] = propertyResult as DeepPartial<
        PropertyResult<TProperties, TConditions>[typeof property]
      >;

      continue;
    }

    for (const value in values) {
      const defaultClass = style({
        '@layer': {
          [layers.atom]: {
            [property]: values[value],
          },
        },
      });

      const propResult = {
        defaultClass,
      } as PropertyResultValue<unknown[]> & {
        modeClasses?: Record<ColorMode, string>;
      };

      if (isValidConditionList(conditions)) {
        propResult.conditions = conditions.map((condition, i) => {
          if (i === 0 && Object.keys(condition).length === 0) {
            return defaultClass;
          }

          if (typeof condition === 'object' && condition['@media']) {
            return style({
              '@media': {
                [condition['@media']]: {
                  [property]: values[value],
                },
              },
            });
          }

          throw new Error(
            `Invalid condition for ${property}: ${JSON.stringify(condition)}`,
          );
        });
      }

      if (isModeProperty(property)) {
        propResult.modeClasses = makeModeClasses(
          property,
          values[value] as AtomicPrimitiveValue,
        );
      }

      propertyResult.values[value] = propResult;
    }

    result[property] = propertyResult as DeepPartial<
      PropertyResult<TProperties, TConditions>[typeof property]
    >;
  }

  return result as PropertyResult<TProperties, TConditions, TModeKey>;
}

const modeSelector = (setting: string) =>
  `html[${colorModeAttribute}="${setting}"] &`;

/** The media query under which `system` renders `mode`, or undefined if it never does. */
function systemQuery(mode: ColorMode): string | undefined {
  const query = systemColorModeQueries[mode];

  if (query) {
    return query;
  }

  if (mode !== systemFallbackColorMode) {
    return undefined;
  }

  // The fallback mode applies when no other mode's query matches.
  const otherQueries = colorModes
    .map((other) => systemColorModeQueries[other])
    .filter((other): other is string => Boolean(other));

  return otherQueries.map((other) => `(not ${other})`).join(' and ');
}

/**
 * One class per Color mode, applying `value` of `property` only while that
 * mode is active: `html[data-color-mode="<mode>"]`, `system` through its media
 * query, and (for the fallback mode) before a provider has set the attribute.
 */
function makeModeClasses(
  property: string,
  value: AtomicPrimitiveValue,
): Record<ColorMode, string> {
  const declaration = { [property]: value };
  const modeClasses = {} as Record<ColorMode, string>;

  for (const mode of colorModes) {
    const selectors: Record<string, object> = {
      [modeSelector(mode)]: declaration,
    };

    if (mode === systemFallbackColorMode) {
      selectors[`:root:not([${colorModeAttribute}]) &`] = declaration;
    }

    const query = systemQuery(mode);

    modeClasses[mode] = style({
      '@layer': {
        [layers.atom]: {
          selectors,
          ...(query
            ? {
                '@media': {
                  [query]: {
                    selectors: { [modeSelector('system')]: declaration },
                  },
                },
              }
            : {}),
        },
      },
    });
  }

  return modeClasses;
}

function isValidConditionList(
  condition?: unknown,
): condition is PropertyCondition[] {
  return Array.isArray(condition) && condition.length > 0;
}
