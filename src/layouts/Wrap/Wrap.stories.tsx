import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wrap } from './Wrap';

const meta = {
  title: 'Layouts/Wrap',
  component: Wrap,
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
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof Wrap>;

export default meta;
type Story = StoryObj<typeof meta>;

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm">{children}</span>
);

export const Default: Story = {
  args: {
    gap: 'sm',
    className: 'max-w-md',
    children: (
      <>
        <Tag>JavaScript</Tag>
        <Tag>TypeScript</Tag>
        <Tag>React</Tag>
        <Tag>Vue</Tag>
        <Tag>Angular</Tag>
        <Tag>Svelte</Tag>
        <Tag>Node.js</Tag>
        <Tag>Deno</Tag>
        <Tag>Bun</Tag>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    gap: 'sm',
    justify: 'center',
    className: 'max-w-md',
    children: (
      <>
        <Tag>One</Tag>
        <Tag>Two</Tag>
        <Tag>Three</Tag>
        <Tag>Four</Tag>
        <Tag>Five</Tag>
      </>
    ),
  },
};

export const ButtonGroup: Story = {
  name: 'Button Group',
  args: {
    gap: 'sm',
    children: (
      <>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Edit
        </button>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Delete
        </button>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Share
        </button>
        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </>
    ),
  },
};

export const FilterChips: Story = {
  name: 'Filter Chips',
  args: {
    gap: 'xs',
    className: 'max-w-sm',
    children: (
      <>
        {['All', 'Active', 'Completed', 'Pending', 'Cancelled', 'Archived'].map((filter) => (
          <button
            key={filter}
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {filter}
          </button>
        ))}
      </>
    ),
  },
};

export const AllGaps: Story = {
  name: 'Gap Sizes',
  render: () => (
    <div className="space-y-6">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-500 mb-2">gap=&quot;{gap}&quot;</p>
          <Wrap gap={gap} className="max-w-xs bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <Tag>A</Tag>
            <Tag>B</Tag>
            <Tag>C</Tag>
            <Tag>D</Tag>
            <Tag>E</Tag>
          </Wrap>
        </div>
      ))}
    </div>
  ),
};

export const VariableWidths: Story = {
  name: 'Variable Width Items',
  args: {
    gap: 'sm',
    className: 'max-w-md',
    children: (
      <>
        <Tag>Short</Tag>
        <Tag>A bit longer</Tag>
        <Tag>X</Tag>
        <Tag>Medium length text</Tag>
        <Tag>Tiny</Tag>
        <Tag>This is a much longer tag that takes more space</Tag>
        <Tag>OK</Tag>
      </>
    ),
  },
};
