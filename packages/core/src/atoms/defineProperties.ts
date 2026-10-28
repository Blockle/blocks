import { style } from '@vanilla-extract/css';
import type { Properties as CSSProperties } from 'csstype';

import {
  type ColorMode,
  colorModeSelector,
  colorModes,
  systemColorModeQuery,
  systemColorModeSelectors,
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

  const addModeClasses = (
    propResult: { modeClasses?: Record<ColorMode, string> },
    property: string,
    value: AtomicPrimitiveValue,
  ) => {
    if (isModeProperty(property)) {
      propResult.modeClasses = makeModeClasses(property, value);
    }
  };

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

        addModeClasses(propResult, property, value);

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

      addModeClasses(
        propResult,
        property,
        values[value] as AtomicPrimitiveValue,
      );

      propertyResult.values[value] = propResult;
    }

    result[property] = propertyResult as DeepPartial<
      PropertyResult<TProperties, TConditions>[typeof property]
    >;
  }

  return result as PropertyResult<TProperties, TConditions, TModeKey>;
}

/**
 * One class per Color mode, applying `value` of `property` only while that
 * mode is active: `html[data-color-mode="<mode>"]`, `system` through its media
 * query. `system` also applies while the attribute is absent (see
 * `systemColorModeSelectors`).
 */
function makeModeClasses(
  property: string,
  value: AtomicPrimitiveValue,
): Record<ColorMode, string> {
  const declaration = { [property]: value };
  const modeClasses = {} as Record<ColorMode, string>;

  const scoped = (selector: string) => `${selector} &`;

  for (const mode of colorModes) {
    const selectors: Record<string, object> = {
      [scoped(colorModeSelector(mode))]: declaration,
    };
    const query = systemColorModeQuery(mode);

    // Without a media query, the system selectors apply to the mode only
    // when it is the fallback, which has no query of its own to wait for.
    if (!query && mode === systemFallbackColorMode) {
      for (const selector of systemColorModeSelectors) {
        selectors[scoped(selector)] = declaration;
      }
    }

    modeClasses[mode] = style({
      '@layer': {
        [layers.atom]: {
          selectors,
          ...(query
            ? {
                '@media': {
                  [query]: {
                    selectors: Object.fromEntries(
                      systemColorModeSelectors.map((selector) => [
                        scoped(selector),
                        declaration,
                      ]),
                    ),
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
