import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { useControlledValue } from './useControlledValue.js';

describe('useControlledValue', () => {
  it('Should return defaultValue when uncontrolled', () => {
    const result = renderHook(() => useControlledValue({ defaultValue: 0 }));

    expect(result.result.current[0]).toEqual(0);
    expect(result.result.current[1]).toBeTypeOf('function');
  });

  it('Should update local value when uncontrolled', () => {
    const result = renderHook(() => useControlledValue({ defaultValue: 0 }));

    act(() => {
      result.result.current[1](2);
    });

    result.rerender();

    expect(result.result.current[0]).toEqual(2);
    expect(result.result.current[1]).toBeTypeOf('function');
  });

  it('Should return value when controlled', () => {
    const onChange = vi.fn();
    const result = renderHook(() => useControlledValue({ onChange, value: 5 }));

    expect(result.result.current[0]).toEqual(5);
    expect(result.result.current[1]).toBeTypeOf('function');
  });

  it('Should update local value when controlled', () => {
    const onChange = vi.fn();
    const result = renderHook(() => useControlledValue({ onChange, value: 5 }));

    act(() => {
      result.result.current[1](2);
    });

    result.rerender();

    expect(onChange).toBeCalledWith(2);
  });
});
