// oxlint-disable-next-line no-unassigned-import -- side-effect import for jest-dom matchers
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
