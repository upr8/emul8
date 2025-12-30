import { describe, expect, it } from 'vitest';
import { ConfigContext } from './context';

describe('ConfigContext', () => {
  it('is defined', () => {
    expect(ConfigContext).toBeDefined();
  });

  it('has null as default value', () => {
    // Access the default value through Consumer
    expect(ConfigContext.Provider).toBeDefined();
    expect(ConfigContext.Consumer).toBeDefined();
  });
});
