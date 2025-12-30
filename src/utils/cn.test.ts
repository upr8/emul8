import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('merges class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles undefined values', () => {
    const result = cn('foo', undefined, 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles null values', () => {
    const result = cn('foo', null, 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles false values', () => {
    const result = cn('foo', false, 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base active');
  });

  it('handles conditional classes when false', () => {
    const isActive = false;
    const result = cn('base', isActive && 'active');
    expect(result).toBe('base');
  });

  it('handles array of classes', () => {
    const result = cn(['foo', 'bar']);
    expect(result).toBe('foo bar');
  });

  it('handles object syntax', () => {
    const result = cn({ foo: true, bar: false, baz: true });
    expect(result).toBe('foo baz');
  });

  it('merges Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4');
    expect(result).toBe('py-1 px-4');
  });

  it('handles conflicting Tailwind classes', () => {
    const result = cn('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
  });

  it('handles empty input', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles complex nested structures', () => {
    const result = cn('base', ['nested', { conditional: true }], { another: true });
    expect(result).toBe('base nested conditional another');
  });
});
