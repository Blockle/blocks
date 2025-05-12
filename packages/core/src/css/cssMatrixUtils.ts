export type Vector2D = [x: number, y: number];
export type Matrix2D = {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
};
type RawMatrix2D = [
  a: number,
  b: number,
  c: number,
  d: number,
  tx: number,
  ty: number,
];

export function parseCSSTransform(
  styleDeclaration: CSSStyleDeclaration,
): Matrix2D {
  const transform = styleDeclaration.getPropertyValue('transform');

  if (!transform || transform === 'none' || !transform.startsWith('matrix(')) {
    if (import.meta.env.DEV) {
      console.warn(
        'Transform is not defined or is not a matrix. Returning identity matrix.',
      );
    }

    return {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0,
    };
  }
  const matrixValues = transform
    .substring(7, transform.length - 1)
    .split(',')
    .map((value) => cssValueToNumber(value.trim())) as RawMatrix2D;

  if (matrixValues.length !== 6) {
    throw new Error('Invalid matrix value');
  }

  return {
    a: matrixValues[0],
    b: matrixValues[1],
    c: matrixValues[2],
    d: matrixValues[3],
    tx: matrixValues[4],
    ty: matrixValues[5],
  };
}

export function getCSSScale(styleDeclaration: CSSStyleDeclaration): Vector2D {
  const scale = styleDeclaration.getPropertyValue('scale');

  if (!scale || scale === 'none') {
    const matrix2d = parseCSSTransform(styleDeclaration);
    const scaleX = Math.sqrt(matrix2d.a * matrix2d.a + matrix2d.b * matrix2d.b);
    const scaleY = Math.sqrt(matrix2d.c * matrix2d.c + matrix2d.d * matrix2d.d);
    return [scaleX, scaleY];
  }

  if (scale.includes(' ')) {
    return scale.split(' ').map((value) => cssValueToNumber(value)) as Vector2D;
  }

  const scaleValue = cssValueToNumber(scale);

  return [scaleValue, scaleValue];
}

export function getOriginalElementSize(
  styleDeclaration: CSSStyleDeclaration,
  width: number,
  height: number,
): Vector2D {
  const [scaleX, scaleY] = getCSSScale(styleDeclaration);

  return [width / scaleX, height / scaleY];
}

export function cssValueToNumber(value?: string): number {
  if (!value) {
    return 0;
  }

  const parsedValue = Number.parseFloat(value);

  if (Number.isNaN(parsedValue)) {
    return 0;
  }

  return parsedValue;
}
