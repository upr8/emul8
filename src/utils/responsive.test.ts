import { describe, expect, it } from 'vitest';
import {
  BREAKPOINTS,
  GAP_VARIANTS,
  isResponsiveObject,
  PADDING_VARIANTS,
  parseResponsive,
  responsiveClasses,
  responsiveGap,
  responsiveGapX,
  responsiveGapY,
  responsiveGridColumns,
  responsiveM,
  responsiveMx,
  responsiveP,
  responsivePadding,
  responsivePx,
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

  it('returns object with single breakpoint as-is', () => {
    expect(parseResponsive({ base: 'sm', md: 'md' })).toEqual({ base: 'sm', md: 'md' });
  });

  it('returns object with multiple breakpoints as-is', () => {
    expect(parseResponsive({ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' })).toEqual({
      base: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    });
  });

  it('returns object without base as-is', () => {
    expect(parseResponsive({ md: 'md', lg: 'lg' })).toEqual({ md: 'md', lg: 'lg' });
  });

  it('handles xl breakpoint', () => {
    expect(parseResponsive({ base: 'sm', xl: 'xl' })).toEqual({ base: 'sm', xl: 'xl' });
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
    expect(responsiveGap({ base: 'sm', md: 'md', lg: 'lg' })).toBe('gap-2 md:gap-4 lg:gap-6');
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

  it('returns RTL-safe logical padding classes', () => {
    expect(responsivePadding('md')).toBe('ps-6 pe-6');
  });

  it('returns responsive padding classes with logical properties', () => {
    expect(responsivePadding({ base: 'sm', md: 'md', lg: 'lg' })).toBe(
      'ps-4 pe-4 md:ps-6 md:pe-6 lg:ps-8 lg:pe-8'
    );
  });

  it('handles all padding sizes with RTL-safe logical properties', () => {
    expect(responsivePadding('none')).toBe('ps-0 pe-0');
    expect(responsivePadding('xs')).toBe('ps-2 pe-2');
    expect(responsivePadding('sm')).toBe('ps-4 pe-4');
    expect(responsivePadding('md')).toBe('ps-6 pe-6');
    expect(responsivePadding('lg')).toBe('ps-8 pe-8');
    expect(responsivePadding('xl')).toBe('ps-12 pe-12');
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

describe('isResponsiveObject', () => {
  it('returns false for undefined', () => {
    expect(isResponsiveObject(undefined)).toBe(false);
  });

  it('returns false for string', () => {
    expect(isResponsiveObject('sm')).toBe(false);
  });

  it('returns true for object', () => {
    expect(isResponsiveObject({ base: 'sm', md: 'md' })).toBe(true);
  });
});

describe('parseResponsive with object syntax', () => {
  it('returns object as-is', () => {
    const obj = { base: 'sm', md: 'md', lg: 'lg' };
    expect(parseResponsive(obj)).toEqual(obj);
  });
});

describe('responsiveGapX', () => {
  it('returns empty string for undefined', () => {
    expect(responsiveGapX(undefined)).toBe('');
  });

  it('returns gap-x class', () => {
    expect(responsiveGapX('md')).toBe('gap-x-4');
  });

  it('returns responsive gap-x classes', () => {
    expect(responsiveGapX({ base: 'sm', md: 'md' })).toBe('gap-x-2 md:gap-x-4');
  });
});

describe('responsiveGapY', () => {
  it('returns empty string for undefined', () => {
    expect(responsiveGapY(undefined)).toBe('');
  });

  it('returns gap-y class', () => {
    expect(responsiveGapY('lg')).toBe('gap-y-6');
  });
});

describe('responsiveGridColumns', () => {
  it('returns empty string for undefined', () => {
    expect(responsiveGridColumns(undefined)).toBe('');
  });

  it('returns grid-cols class', () => {
    expect(responsiveGridColumns('3')).toBe('grid-cols-3');
  });

  it('returns responsive grid-cols classes', () => {
    expect(responsiveGridColumns({ base: '1', md: '3' })).toBe('grid-cols-1 md:grid-cols-3');
  });
});

describe('responsive spacing helpers', () => {
  it('responsiveP returns p- classes', () => {
    expect(responsiveP('4')).toBe('p-4');
    expect(responsiveP({ base: '2', md: '4' })).toBe('p-2 md:p-4');
  });

  it('responsivePx returns px- classes', () => {
    expect(responsivePx('4')).toBe('px-4');
  });

  it('responsiveM returns m- classes', () => {
    expect(responsiveM('4')).toBe('m-4');
  });

  it('responsiveMx returns mx- classes', () => {
    expect(responsiveMx('auto')).toBe('mx-auto');
  });

  it('returns empty string for undefined', () => {
    expect(responsiveP(undefined)).toBe('');
  });
});
