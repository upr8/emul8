import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimpleGrid } from './SimpleGrid';

const meta = {
  title: 'Layouts/SimpleGrid',
  component: SimpleGrid,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    columns: {
      control: 'text',
      description: 'Number of columns. Supports responsive object syntax.',
    },
    minChildWidth: {
      control: 'text',
      description: 'Minimum width for auto-responsive columns.',
    },
    gap: {
      control: 'text',
      description: 'Gap between items. Supports responsive syntax.',
    },
    gapX: {
      control: 'text',
      description: 'Horizontal gap between items.',
    },
    gapY: {
      control: 'text',
      description: 'Vertical gap between items.',
    },
  },
} satisfies Meta<typeof SimpleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded h-24 flex items-center justify-center">
    {children}
  </div>
);

export const Default: Story = {
  args: {
    columns: '3',
    gap: 'md',
    children: (
      <>
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>4</Card>
        <Card>5</Card>
        <Card>6</Card>
      </>
    ),
  },
};

export const ResponsiveColumns: Story = {
  name: 'Responsive Columns',
  render: () => (
    <SimpleGrid columns={{ base: '1', sm: '2', md: '3', lg: '4' }} gap="md">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <Card key={n}>{n}</Card>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Columns adapt to screen size: 1 column on mobile, 2 on sm, 3 on md, 4 on lg. Resize your browser to see the effect.',
      },
    },
  },
};

export const MinChildWidth: Story = {
  name: 'Auto-Responsive (minChildWidth)',
  render: () => (
    <SimpleGrid minChildWidth="200px" gap="md">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <Card key={n}>{n}</Card>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Columns are calculated automatically based on available space. Each item is at least 200px wide.',
      },
    },
  },
};

export const TwoColumns: Story = {
  name: 'Two Columns',
  args: {
    columns: '2',
    gap: 'lg',
    children: (
      <>
        <Card>Left</Card>
        <Card>Right</Card>
        <Card>Left</Card>
        <Card>Right</Card>
      </>
    ),
  },
};

export const ProductGrid: Story = {
  name: 'Product Grid',
  render: () => (
    <SimpleGrid columns={{ base: '1', sm: '2', lg: '3' }} gap={{ base: 'sm', md: 'lg' }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded mb-4" />
          <h3 className="font-bold mb-2">Product {n}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">$99.99</p>
        </div>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world e-commerce grid with responsive columns and gap.',
      },
    },
  },
};

export const ImageGallery: Story = {
  name: 'Image Gallery',
  render: () => (
    <SimpleGrid minChildWidth="150px" gap="sm">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <div
          key={n}
          className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
        >
          {n}
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const SeparateGaps: Story = {
  name: 'Separate X/Y Gaps',
  render: () => (
    <SimpleGrid columns="3" gapX="lg" gapY="sm">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <Card key={n}>{n}</Card>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different horizontal and vertical gap sizes.',
      },
    },
  },
};

export const ResponsiveGap: Story = {
  name: 'Responsive Gap',
  render: () => (
    <SimpleGrid columns="3" gap={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}>
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Card key={n}>{n}</Card>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gap adapts to screen size.',
      },
    },
  },
};

export const AllGapSizes: Story = {
  name: 'Gap Sizes',
  render: () => (
    <div className="space-y-8">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">gap=&quot;{gap}&quot;</p>
          <SimpleGrid columns="4" gap={gap}>
            <Card>1</Card>
            <Card>2</Card>
            <Card>3</Card>
            <Card>4</Card>
          </SimpleGrid>
        </div>
      ))}
    </div>
  ),
};

export const CardLayout: Story = {
  name: 'Card Layout',
  render: () => (
    <SimpleGrid columns={{ base: '1', md: '2', lg: '3' }} gap="md">
      {['Design', 'Development', 'Marketing', 'Sales', 'Support', 'Operations'].map((dept) => (
        <div
          key={dept}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-bold text-lg mb-2">{dept}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      ))}
    </SimpleGrid>
  ),
};

export const DashboardGrid: Story = {
  name: 'Dashboard Grid',
  render: () => (
    <SimpleGrid columns={{ base: '1', sm: '2', lg: '4' }} gap={{ base: 'sm', md: 'md' }}>
      {['Revenue', 'Users', 'Orders', 'Conversion'].map((metric) => (
        <div
          key={metric}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">{metric}</p>
          <p className="text-2xl font-bold mt-1">$12,345</p>
          <p className="text-xs text-green-700 dark:text-green-400 mt-1">+12.5%</p>
        </div>
      ))}
    </SimpleGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard metrics grid with responsive columns.',
      },
    },
  },
};
