import {
  type ColorMode,
  colorModes,
  type ModeValue,
} from '../config/colorMode.js';
import { atomicProperties } from './atoms.css.js';

export type AtomicProperties = typeof atomicProperties;

type AtomValue<K extends keyof AtomicProperties> =
  AtomicProperties[K]['values'] extends Record<
    string,
    {
      defaultClass: string;
      conditions: string[];
    }
  >
    ?
        | keyof AtomicProperties[K]['values']
        | (keyof AtomicProperties[K]['values'])[]
    : keyof AtomicProperties[K]['values'];

/** Properties whose values have a class per Color mode, so accept a Mode value. */
type ModeProperty = {
  [K in keyof AtomicProperties]: AtomicProperties[K]['values'][keyof AtomicProperties[K]['values']] extends {
    modeClasses: Record<ColorMode, string>;
  }
    ? K
    : never;
}[keyof AtomicProperties];

export type AtomProperties = {
  [K in keyof AtomicProperties]?: K extends ModeProperty
    ?
        | keyof AtomicProperties[K]['values']
        | ModeValue<keyof AtomicProperties[K]['values']>
    : AtomValue<K>;
};

export function atoms(properties: AtomProperties): string {
  const classList: string[] = [];

  for (const property in properties) {
    const value = properties[property as keyof AtomProperties];
    const target = atomicProperties[property as keyof AtomProperties] as {
      values: Record<string, { defaultClass: string; conditions: string[] }>;
    };

    if (!target) {
      if (import.meta.env.DEV) {
        console.warn(
          `atoms: Property "${property}" is not defined in atomicProperties.`,
        );
      }
      continue;
    }

    if (isModeValue(value)) {
      for (const mode of colorModes) {
        const modeClass = (
          target.values[value[mode] as string] as
            | { modeClasses?: Record<ColorMode, string> }
            | undefined
        )?.modeClasses?.[mode];

        if (modeClass) {
          classList.push(modeClass);
        }
      }
    } else if (typeof value === 'string' || typeof value === 'number') {
      if (target.values[value] !== undefined) {
        classList.push(target.values[value].defaultClass);
      }
    } else if (Array.isArray(value)) {
      value.forEach((val, i) => {
        const atomicValue = target.values[val];

        if (i === 0) {
          if (atomicValue) {
            classList.push(atomicValue.defaultClass);
          }
          return;
        }

        if (!atomicValue?.conditions[i]) {
          if (import.meta.env.DEV) {
            console.warn(
              `atoms: Condition for "${property}" with value "${val}" not found.`,
            );
          }

          return;
        }

        classList.push(atomicValue?.conditions[i]);
      });
    }
  }

  return classList.join(' ');
}

function isModeValue(value: unknown): value is Record<ColorMode, string> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export type Atoms = Parameters<typeof atoms>[0];
