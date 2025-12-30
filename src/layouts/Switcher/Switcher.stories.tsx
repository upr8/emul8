import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switcher } from './Switcher';

const meta = {
  title: 'Layouts/Switcher',
  component: Switcher,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    threshold: {
      control: 'text',
    },
    limit: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">{children}</div>
);

export const Default: Story = {
  args: {
    threshold: '30rem',
    gap: 'md',
    children: (
      <>
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
      </>
    ),
  },
};

export const NarrowThreshold: Story = {
  args: {
    threshold: '20rem',
    gap: 'md',
    children: (
      <>
        <Card>Item 1</Card>
        <Card>Item 2</Card>
      </>
    ),
  },
};

export const WideThreshold: Story = {
  args: {
    threshold: '50rem',
    gap: 'lg',
    children: (
      <>
        <Card>Column 1</Card>
        <Card>Column 2</Card>
        <Card>Column 3</Card>
      </>
    ),
  },
};

export const WithLimit: Story = {
  args: {
    threshold: '40rem',
    gap: 'md',
    limit: 3,
    children: (
      <>
        <Card>Item 1</Card>
        <Card>Item 2</Card>
        <Card>Item 3</Card>
        <Card>Item 4 - Forces vertical</Card>
        <Card>Item 5</Card>
      </>
    ),
  },
};

export const TwoColumns: Story = {
  args: {
    threshold: '25rem',
    gap: 'lg',
    children: (
      <>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded">
          <h3 className="font-bold mb-2">Left Column</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This column will stack below when the container is narrow.
          </p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded">
          <h3 className="font-bold mb-2">Right Column</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Resize the container to see the switching behavior.
          </p>
        </div>
      </>
    ),
  },
};

export const ResponsiveForm: Story = {
  args: {
    threshold: '35rem',
    gap: 'md',
    children: (
      <>
        <div className="space-y-2 flex-1">
          <label htmlFor="form-first-name" className="block text-sm font-medium">
            First Name
          </label>
          <input
            id="form-first-name"
            type="text"
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            placeholder="John"
          />
        </div>
        <div className="space-y-2 flex-1">
          <label htmlFor="form-last-name" className="block text-sm font-medium">
            Last Name
          </label>
          <input
            id="form-last-name"
            type="text"
            className="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            placeholder="Doe"
          />
        </div>
      </>
    ),
  },
};

export const AllGaps: Story = {
  name: 'Gap Sizes',
  render: () => (
    <div className="space-y-8">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-500 mb-2">gap: {gap}</p>
          <Switcher gap={gap} threshold="20rem">
            <Card>A</Card>
            <Card>B</Card>
            <Card>C</Card>
          </Switcher>
        </div>
      ))}
    </div>
  ),
};
