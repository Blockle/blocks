import { Atoms } from '../css/atoms';

export type HTMLElementProps<E extends Element> = Omit<React.HTMLProps<E>, keyof Atoms | 'ref'>;

export function isObjectLike<T extends Record<string, unknown>>(value: T): value is T {
  return typeof value === 'object' && value !== null;
}
