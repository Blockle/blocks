import type { Atoms } from '../../atoms/atoms';

export type AnyString = string & {};

/**
 * Suggest a type for a string literal but also allow any string.
 */
export type OptionalLiteral<T extends string> = T | AnyString;

export type RecordLike = Record<string | number, unknown>;

export function isObjectLike<T extends RecordLike>(value: T): value is T {
  return typeof value === 'object' && value !== null;
}

export type IsStringUnion<T> = T extends string
  ? string extends T
    ? false
    : true
  : false;
export type IsNumberUnion<T> = T extends number
  ? number extends T
    ? false
    : true
  : false;

export type IsUnion<T> = IsStringUnion<T> extends true
  ? true
  : IsNumberUnion<T> extends true
    ? true
    : false;

export type HTMLElementProps<E extends Element> = Omit<
  React.HTMLProps<E>,
  keyof Atoms | 'ref'
>;
