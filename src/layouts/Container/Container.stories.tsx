import type { Meta, StoryObj } from '@storybook/react-vite';
import { Center, Container } from './Container';

const meta = {
  title: 'Layouts/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    center: {
      control: 'boolean',
    },
    intrinsic: {
      control: 'boolean',
    },
    andText: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Container Content</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This content is centered with max-width constraints and responsive padding.
        </p>
      </div>
    ),
  },
};

export const AllSizes: Story = {
  name: 'Size Comparison',
  render: () => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <Container key={size} size={size}>
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
            <p className="font-mono text-sm">size=&quot;{size}&quot;</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const CenterAlias: Story = {
  name: 'Center (Alias)',
  render: () => (
    <Center size="md" padding="lg">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Using Center Alias</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Center is an alias for Container, emphasizing its centering purpose.
        </p>
      </div>
    </Center>
  ),
};

export const Intrinsic: Story = {
  name: 'Intrinsic Centering',
  args: {
    intrinsic: true,
    children: (
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded inline-block">
        <p>Intrinsic centering - width based on content</p>
      </div>
    ),
  },
};

export const WithTextCentering: Story = {
  name: 'With Text Centering',
  args: {
    andText: true,
    size: 'md',
    children: (
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded">
        <h1 className="text-2xl font-bold mb-4">Centered Heading</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This text is also centered using the andText prop.
        </p>
      </div>
    ),
  },
};

export const IntrinsicWithText: Story = {
  name: 'Intrinsic + Text Centering',
  render: () => (
    <Center intrinsic andText>
      <div className="bg-blue-100 dark:bg-blue-900 p-8 rounded">
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-600 dark:text-gray-400">Both container and text are centered</p>
      </div>
    </Center>
  ),
};
