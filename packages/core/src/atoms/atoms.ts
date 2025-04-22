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

    if (typeof value === 'string') {
      if (target.values[value]) {
        classList.push(target.values[value].defaultClass);
      }
    } else if (Array.isArray(value)) {
      value.forEach((val, i) => {
        if (i === 0) {
          if (target.values[val]) {
            classList.push(target.values[val].defaultClass);
          }
        } else {
          classList.push(target.values[val]?.conditions[i] ?? '');
        }
      });
    }
  }

  return classList.join(' ');
}

export type Atoms = Parameters<typeof atoms>[0];
