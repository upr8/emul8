import type { Meta, StoryObj } from '@storybook/react-vite';
import { Group } from './Group';

const meta = {
  title: 'Layouts/Group',
  component: Group,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline'],
    },
    grow: {
      control: 'boolean',
    },
    preventGrow: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gap: 'sm',
    children: (
      <>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Cancel
        </button>
        <button type="button" className="px-4 py-2 bg-blue-700 text-white rounded">
          Save
        </button>
      </>
    ),
  },
};

export const IconWithText: Story = {
  name: 'Icon + Text',
  args: {
    gap: 'xs',
    children: (
      <>
        <span className="text-lg">⭐</span>
        <span>Favorite</span>
      </>
    ),
  },
};

export const ButtonToolbar: Story = {
  name: 'Button Toolbar',
  args: {
    gap: 'xs',
    children: (
      <>
        <button type="button" className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
          B
        </button>
        <button type="button" className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
          I
        </button>
        <button type="button" className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
          U
        </button>
      </>
    ),
  },
};

export const GrowChildren: Story = {
  name: 'Grow Children',
  args: {
    gap: 'sm',
    grow: true,
    className: 'w-full',
    children: (
      <>
        <button type="button" className="py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Option A
        </button>
        <button type="button" className="py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Option B
        </button>
        <button type="button" className="py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Option C
        </button>
      </>
    ),
  },
};

export const AllGaps: Story = {
  name: 'Gap Sizes',
  render: () => (
    <div className="space-y-4">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-500 mb-2">gap=&quot;{gap}&quot;</p>
          <Group gap={gap}>
            <span className="px-3 py-1 bg-blue-700 text-white rounded">A</span>
            <span className="px-3 py-1 bg-blue-700 text-white rounded">B</span>
            <span className="px-3 py-1 bg-blue-700 text-white rounded">C</span>
          </Group>
        </div>
      ))}
    </div>
  ),
};

export const FormActions: Story = {
  name: 'Form Actions',
  render: () => (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
      <p className="mb-4">Form content would go here...</p>
      <div className="flex justify-end">
        <Group gap="sm">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded"
          >
            Cancel
          </button>
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded">
            Save Draft
          </button>
          <button type="button" className="px-4 py-2 bg-blue-700 text-white rounded">
            Submit
          </button>
        </Group>
      </div>
    </div>
  ),
};

export const WithBadge: Story = {
  name: 'With Badge',
  args: {
    gap: 'xs',
    children: (
      <>
        <span>Messages</span>
        <span className="px-2 py-0.5 bg-red-700 text-white text-xs rounded-full">5</span>
      </>
    ),
  },
};
