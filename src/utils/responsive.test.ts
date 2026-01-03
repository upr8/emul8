import { describe, expect, it } from 'vitest';
import {
  BREAKPOINTS,
  GAP_VARIANTS,
  PADDING_VARIANTS,
  parseResponsive,
  responsiveClasses,
  responsiveGap,
  responsivePadding,
} from './responsive';

describe('parseResponsive', () => {
  it('returns empty object for undefined', () => {
    expect(parseResponsive(undefined)).toEqual({});
  });

  it('returns empty object for empty string', () => {
    expect(parseResponsive('')).toEqual({});
  });

  it('parses single value as base', () => {
    expect(parseResponsive('sm')).toEqual({ base: 'sm' });
  });

  it('parses value with single breakpoint', () => {
    expect(parseResponsive('sm md@md')).toEqual({ base: 'sm', md: 'md' });
  });

  it('parses value with multiple breakpoints', () => {
    expect(parseResponsive('xs sm@sm md@md lg@lg')).toEqual({
      base: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    });
  });

  it('parses only breakpoint values without base', () => {
    expect(parseResponsive('md@md lg@lg')).toEqual({ md: 'md', lg: 'lg' });
  });

  it('handles extra whitespace', () => {
    expect(parseResponsive('  sm   md@md  ')).toEqual({ base: 'sm', md: 'md' });
  });

  it('ignores invalid breakpoints', () => {
    expect(parseResponsive('sm md@invalid')).toEqual({ base: 'sm' });
  });

  it('handles xl breakpoint', () => {
    expect(parseResponsive('sm xl@xl')).toEqual({ base: 'sm', xl: 'xl' });
  });
});

describe('responsiveClasses', () => {
  const testMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  it('returns empty string for empty parsed', () => {
    expect(responsiveClasses({}, testMap)).toBe('');
  });

  it('returns base class without prefix', () => {
    expect(responsiveClasses({ base: 'sm' }, testMap)).toBe('gap-2');
  });

  it('returns breakpoint class with prefix', () => {
    expect(responsiveClasses({ md: 'md' }, testMap)).toBe('md:gap-4');
  });

  it('combines base and breakpoint classes', () => {
    expect(responsiveClasses({ base: 'sm', md: 'md' }, testMap)).toBe('gap-2 md:gap-4');
  });

  it('generates classes in breakpoint order', () => {
    expect(responsiveClasses({ base: 'sm', lg: 'lg', md: 'md' }, testMap)).toBe(
      'gap-2 md:gap-4 lg:gap-6'
    );
  });

  it('skips values not in variant map', () => {
    expect(responsiveClasses({ base: 'invalid', md: 'md' }, testMap)).toBe('md:gap-4');
  });
});

describe('responsiveGap', () => {
  it('returns empty string for undefined', () => {
    expect(responsiveGap(undefined)).toBe('');
  });

  it('returns single gap class', () => {
    expect(responsiveGap('md')).toBe('gap-4');
  });

  it('returns responsive gap classes', () => {
    expect(responsiveGap('sm md@md lg@lg')).toBe('gap-2 md:gap-4 lg:gap-6');
  });

  it('handles all gap sizes', () => {
    expect(responsiveGap('none')).toBe('gap-0');
    expect(responsiveGap('xs')).toBe('gap-1');
    expect(responsiveGap('sm')).toBe('gap-2');
    expect(responsiveGap('md')).toBe('gap-4');
    expect(responsiveGap('lg')).toBe('gap-6');
    expect(responsiveGap('xl')).toBe('gap-8');
    expect(responsiveGap('2xl')).toBe('gap-10');
    expect(responsiveGap('3xl')).toBe('gap-12');
  });
});

describe('responsivePadding', () => {
  it('returns empty string for undefined', () => {
    expect(responsivePadding(undefined)).toBe('');
  });

  it('returns single padding class', () => {
    expect(responsivePadding('md')).toBe('px-6');
  });

  it('returns responsive padding classes', () => {
    expect(responsivePadding('sm md@md lg@lg')).toBe('px-4 md:px-6 lg:px-8');
  });

  it('handles all padding sizes', () => {
    expect(responsivePadding('none')).toBe('px-0');
    expect(responsivePadding('xs')).toBe('px-2');
    expect(responsivePadding('sm')).toBe('px-4');
    expect(responsivePadding('md')).toBe('px-6');
    expect(responsivePadding('lg')).toBe('px-8');
    expect(responsivePadding('xl')).toBe('px-12');
  });
});

describe('constants', () => {
  it('exports BREAKPOINTS in correct order', () => {
    expect(BREAKPOINTS).toEqual(['sm', 'md', 'lg', 'xl']);
  });

  it('exports GAP_VARIANTS with all sizes', () => {
    expect(Object.keys(GAP_VARIANTS)).toContain('none');
    expect(Object.keys(GAP_VARIANTS)).toContain('xs');
    expect(Object.keys(GAP_VARIANTS)).toContain('sm');
    expect(Object.keys(GAP_VARIANTS)).toContain('md');
    expect(Object.keys(GAP_VARIANTS)).toContain('lg');
    expect(Object.keys(GAP_VARIANTS)).toContain('xl');
  });

  it('exports PADDING_VARIANTS with all sizes', () => {
    expect(Object.keys(PADDING_VARIANTS)).toContain('none');
    expect(Object.keys(PADDING_VARIANTS)).toContain('sm');
    expect(Object.keys(PADDING_VARIANTS)).toContain('md');
    expect(Object.keys(PADDING_VARIANTS)).toContain('lg');
  });
});
