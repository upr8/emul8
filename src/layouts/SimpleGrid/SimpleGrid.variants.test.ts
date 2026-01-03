import { describe, expect, it } from 'vitest';
import { simpleGridVariants } from './SimpleGrid.variants';

describe('simpleGridVariants', () => {
  it('applies default gap', () => {
    const result = simpleGridVariants();
    expect(result).toContain('gap-4');
  });

  it('applies gap variants', () => {
    expect(simpleGridVariants({ gap: 'none' })).toContain('gap-0');
    expect(simpleGridVariants({ gap: 'xs' })).toContain('gap-1');
    expect(simpleGridVariants({ gap: 'sm' })).toContain('gap-2');
    expect(simpleGridVariants({ gap: 'md' })).toContain('gap-4');
    expect(simpleGridVariants({ gap: 'lg' })).toContain('gap-6');
    expect(simpleGridVariants({ gap: 'xl' })).toContain('gap-8');
    expect(simpleGridVariants({ gap: '2xl' })).toContain('gap-10');
    expect(simpleGridVariants({ gap: '3xl' })).toContain('gap-12');
  });

  it('includes grid class', () => {
    const result = simpleGridVariants();
    expect(result).toContain('grid');
  });
});
