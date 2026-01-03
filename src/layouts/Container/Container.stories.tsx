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
      control: 'text',
      description:
        'Padding size. Supports responsive @breakpoint notation (e.g., "sm md@md lg@lg")',
    },
    fluid: {
      control: 'boolean',
      description: 'Enable fluid mode for full-width layouts',
    },
    center: {
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

export const Centered: Story = {
  name: 'Center Children',
  args: {
    center: true,
    children: (
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded inline-block">
        <p>Children are centered within the container</p>
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

export const CenteredWithText: Story = {
  name: 'Center + Text Centering',
  render: () => (
    <Center center andText>
      <div className="bg-blue-100 dark:bg-blue-900 p-8 rounded">
        <h1 className="text-2xl font-bold mb-2">Welcome</h1>
        <p className="text-gray-600 dark:text-gray-400">Both children and text are centered</p>
      </div>
    </Center>
  ),
};

export const Fluid: Story = {
  name: 'Fluid (Full Width)',
  render: () => (
    <Container fluid padding="md">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded text-white">
        <h2 className="text-2xl font-bold mb-2">Full Width Hero</h2>
        <p>This container has no max-width constraint and spans edge-to-edge.</p>
      </div>
    </Container>
  ),
};

export const ResponsivePadding: Story = {
  name: 'Responsive Padding',
  render: () => (
    <Container padding="sm md@md lg@lg">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Responsive Padding</h2>
        <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
          padding=&quot;sm md@md lg@lg&quot;
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Padding adjusts at different breakpoints: px-4 (base), md:px-6, lg:px-8
        </p>
      </div>
    </Container>
  ),
};

export const FluidWithResponsivePadding: Story = {
  name: 'Fluid + Responsive Padding',
  render: () => (
    <Container fluid padding="xs sm@sm md@md lg@lg">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded text-white">
        <h2 className="text-2xl font-bold mb-2">Full Width with Responsive Padding</h2>
        <p className="font-mono text-sm mb-2">fluid padding=&quot;xs sm@sm md@md lg@lg&quot;</p>
        <p>Combines fluid (no max-width) with responsive padding at each breakpoint.</p>
      </div>
    </Container>
  ),
};
