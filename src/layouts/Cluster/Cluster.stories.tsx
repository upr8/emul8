import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cluster } from './Cluster';

const meta = {
  title: 'Layouts/Cluster',
  component: Cluster,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
    },
  },
} satisfies Meta<typeof Cluster>;

export default meta;
type Story = StoryObj<typeof meta>;

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm">{children}</span>
);

export const Default: Story = {
  args: {
    gap: 'sm',
    children: (
      <>
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>Tailwind</Tag>
        <Tag>Vite</Tag>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    gap: 'md',
    justify: 'center',
    children: (
      <>
        <Tag>Center</Tag>
        <Tag>Aligned</Tag>
        <Tag>Tags</Tag>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    gap: 'md',
    justify: 'between',
    className: 'w-full',
    children: (
      <>
        <Tag>Left</Tag>
        <Tag>Right</Tag>
      </>
    ),
  },
};

export const SpaceAround: Story = {
  args: {
    gap: 'md',
    justify: 'around',
    className: 'w-full',
    children: (
      <>
        <Tag>One</Tag>
        <Tag>Two</Tag>
        <Tag>Three</Tag>
      </>
    ),
  },
};

export const SpaceEvenly: Story = {
  args: {
    gap: 'md',
    justify: 'evenly',
    className: 'w-full',
    children: (
      <>
        <Tag>One</Tag>
        <Tag>Two</Tag>
        <Tag>Three</Tag>
      </>
    ),
  },
};

export const WrappingTags: Story = {
  args: {
    gap: 'sm',
    className: 'max-w-xs',
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
      </>
    ),
  },
};

export const ButtonGroup: Story = {
  args: {
    gap: 'sm',
    children: (
      <>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Cancel
        </button>
        <button type="button" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save
        </button>
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
          <p className="text-sm text-gray-500 mb-2">gap: {gap}</p>
          <Cluster gap={gap}>
            <Tag>A</Tag>
            <Tag>B</Tag>
            <Tag>C</Tag>
            <Tag>D</Tag>
          </Cluster>
        </div>
      ))}
    </div>
  ),
};

export const VerticalAlignment: Story = {
  render: () => (
    <div className="space-y-6">
      {(['start', 'center', 'end', 'baseline'] as const).map((align) => (
        <div key={align}>
          <p className="text-sm text-gray-500 mb-2">align: {align}</p>
          <Cluster gap="md" align={align} className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <span className="text-xs bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded">Small</span>
            <span className="text-lg bg-blue-200 dark:bg-blue-800 px-2 py-3 rounded">Large</span>
            <span className="text-sm bg-blue-200 dark:bg-blue-800 px-2 py-2 rounded">Medium</span>
          </Cluster>
        </div>
      ))}
    </div>
  ),
};
