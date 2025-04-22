import { style } from '@vanilla-extract/css';
import type { Properties as CSSProperties } from 'csstype';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K] extends any[]
      ? DeepPartial<T[K][number]>[]
      : T[K];
};

type MapArray<T extends any[], V> = {
  [Index in keyof T]: V;
};

type AtomicPrimitiveValue = string | number;
type AtomicProperty =
  | AtomicPrimitiveValue[]
  | Record<string, AtomicPrimitiveValue>;

type Properties = Partial<Record<keyof CSSProperties, AtomicProperty>>;

type PropertyCondition = { '@media'?: string };
type PropertyConditions = PropertyCondition[];

type PropertyDefinition<TProperties, TConditions> = {
  properties: TProperties;
  conditions?: TConditions;
};

type PropertyResultValue<TConditions> = TConditions extends any[]
  ? {
      defaultClass: string;
      conditions: TConditions extends any[]
        ? MapArray<TConditions, string>
        : never;
    }
  : {
      defaultClass: string;
    };

type PropertyResult<TProperties extends Properties, TConditions> = {
  [K in keyof TProperties]: {
    values: TProperties[K] extends any[]
      ? {
          [V in TProperties[K][number]]: PropertyResultValue<TConditions>;
        }
      : {
          [V in keyof TProperties[K]]: PropertyResultValue<TConditions>;
        };
  };
};

export function defineProperties<
  const TProperties extends Properties,
  const TConditions extends PropertyConditions,
>({
  properties,
  conditions,
}: PropertyDefinition<TProperties, TConditions>): PropertyResult<
  TProperties,
  TConditions
> {
  const result: DeepPartial<PropertyResult<TProperties, TConditions>> = {};

  for (const property in properties) {
    const values = properties[property];

    result[property] = {
      values: {},
    } as DeepPartial<PropertyResult<TProperties, TConditions>[typeof property]>;

    const ref = result[property];

    if (!ref || !ref.values) {
      throw new Error(`Invalid property definition for ${property}`);
    }

    if (Array.isArray(values)) {
      for (const value of values) {
        const defaultClass = style({
          [property]: value,
        });

        (
          ref.values as Record<
            string,
            { defaultClass: string; conditions?: string[] } | undefined
          >
        )[value] = {
          defaultClass,
          conditions: conditions?.map((condition, i) => {
            if (i === 0 && Object.keys(condition).length === 0) {
              return defaultClass;
            }

            if (typeof condition === 'object' && condition['@media']) {
              return style({
                '@media': {
                  [condition['@media']]: {
                    [property]: value,
                  },
                },
              });
            }

            throw new Error(
              `Invalid condition for ${property}: ${JSON.stringify(condition)}`,
            );
          }),
        };

        if (!conditions && 'conditions' in ref.values) {
          // biome-ignore lint/performance/noDelete: Only runs when building the project
          delete ref.values.conditions;
        }
      }

      continue;
    }

    for (const value in values) {
      const defaultClass = style({
        [property]: values[value],
      });

      (
        ref.values as Record<
          string,
          { defaultClass: string; conditions?: string[] }
        >
      )[value] = {
        defaultClass,
        conditions: conditions?.map((condition, i) => {
          if (i === 0 && Object.keys(condition).length === 0) {
            return defaultClass;
          }

          if (typeof condition === 'object' && condition['@media']) {
            return style({
              '@media': {
                [condition['@media']]: {
                  [property]: value,
                },
              },
            });
          }

          throw new Error(
            `Invalid condition for ${property}: ${JSON.stringify(condition)}`,
          );
        }),
      };

      if (!conditions && 'conditions' in ref.values) {
        // biome-ignore lint/performance/noDelete: Only runs when building the project
        delete ref.values.conditions;
      }
    }
  }

  return result as PropertyResult<TProperties, TConditions>;
}
