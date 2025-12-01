import type { Atoms } from '../../atoms/atoms.js';

export type AnyString = string & {};
export type RecordLike = Record<string | number, unknown>;

/**
 * Suggest a type for a string literal but also allow any string.
 */
export type OptionalLiteral<T extends string> = T | AnyString;

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
  keyof Atoms
>;

/**
 * Convert a nested record type to a union of dot-separated paths.
 *
 * Example:
 * ```ts
 * type Foo = RecordToUnionPath<{
 *   a: string;
 *   b: { c: { d: string }; d: number };
 *   55: {
 *     100: string[];
 *     200: [string];
 *   };
 * }>;
 * // Result: "a" | "b.c.d" | "b.d" | "e.f" | "e.g" | "55.100" | "55.200"
 * ```
 */
export type RecordToUnionPath<
  TObject,
  TDelimiter extends string = '.',
> = TObject extends RecordLike
  ? {
      [K in keyof TObject]: TObject[K] extends RecordLike
        ? K extends string | number
          ? `${K}${TDelimiter}${RecordToUnionPath<TObject[K], TDelimiter>}`
          : never
        : K;
    }[keyof TObject]
  : TObject;

export type DeepNullable<T> = {
  [P in keyof T]: T[P] extends RecordLike ? DeepNullable<T[P]> : T[P] | null;
};
