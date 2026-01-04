import type { Preview } from '@storybook/react-vite';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'error' - fail tests on a11y violations (default, strict)
      // 'todo' - show violations in UI only (use for dev)
      // 'off' - skip a11y checks entirely
      test: 'error',
    },
  },
};

export default preview;
