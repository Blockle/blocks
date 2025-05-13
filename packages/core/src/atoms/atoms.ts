import { atomicProperties } from './atoms.css';

export type AtomicProperties = typeof atomicProperties;

export type AtomProperties = {
  [K in keyof AtomicProperties]?: AtomicProperties[K]['values'] extends Record<
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

    if (typeof value === 'string' || typeof value === 'number') {
      if (target.values[value] !== undefined) {
        classList.push(target.values[value].defaultClass);
      }
    } else if (Array.isArray(value)) {
      value.forEach((val, i) => {
        const value = target.values[val];

        if (i === 0) {
          if (value) {
            classList.push(value.defaultClass);
          }
          return;
        }

        if (!value?.conditions[i]) {
          if (import.meta.env.DEV) {
            console.warn(
              `atoms: Condition for "${property}" with value "${val}" not found.`,
            );
          }

          return;
        }

        classList.push(value?.conditions[i]);
      });
    }
  }

  return classList.join(' ');
}

export type Atoms = Parameters<typeof atoms>[0];
