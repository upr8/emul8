import type { Meta, StoryObj } from '@storybook/react-vite';
import { Imposter } from './Imposter';

const meta = {
  title: 'Layouts/Imposter',
  component: Imposter,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    fixed: {
      control: 'boolean',
    },
    breakout: {
      control: 'boolean',
    },
    margin: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Imposter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This modal is positioned in the center of its container using the Imposter layout.
        </p>
        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">
          Close
        </button>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative h-96 bg-gray-100 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export const WithMargin: Story = {
  args: {
    margin: '2rem',
    children: (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full h-full flex items-center justify-center">
        <p>Content with 2rem margin from edges</p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative h-96 bg-gray-100 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export const Breakout: Story = {
  args: {
    breakout: true,
    className: 'bg-black/50',
    children: (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md">
        <h2 className="text-xl font-bold mb-4">Breakout Modal</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This imposter breaks out of size constraints.
        </p>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative h-96 bg-gray-100 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
};

export const FixedPosition: Story = {
  args: {
    fixed: true,
    className: 'bg-black/50 z-50',
    children: (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Fixed Modal</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This modal uses fixed positioning and stays in place when scrolling.
        </p>
        <div className="flex gap-3">
          <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
            Cancel
          </button>
          <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    ),
  },
};

export const Tooltip: Story = {
  args: {
    margin: '0.5rem',
    children: (
      <div className="bg-gray-900 text-white px-3 py-2 rounded text-sm shadow-lg">
        Tooltip content
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative w-48 h-24 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
        <span className="text-sm">Hover target</span>
        <Story />
      </div>
    ),
  ],
};

export const ConfirmDialog: Story = {
  args: {
    className: 'bg-black/60',
    children: (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm">
        <h3 className="text-lg font-bold mb-2">Delete Item?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This action cannot be undone. Are you sure you want to continue?
        </p>
        <div className="flex justify-end gap-3">
          <button type="button" className="px-4 py-2 text-gray-600 dark:text-gray-400">
            Cancel
          </button>
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div className="relative h-80 bg-gray-100 dark:bg-gray-900">
        <Story />
      </div>
    ),
  ],
};
