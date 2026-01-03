import type { Meta, StoryObj } from '@storybook/react-vite';
import { Grid } from './Grid';

const meta = {
  title: 'Layouts/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'text',
      description: 'Gap size. Supports responsive object syntax (e.g., { base: "sm", md: "md" })',
    },
    columns: {
      control: 'number',
    },
    min: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded h-24 flex items-center justify-center">
    {children}
  </div>
);

export const Default: Story = {
  args: {
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

export const SmallMinWidth: Story = {
  name: 'Dense Grid (150px)',
  args: {
    gap: 'md',
    min: '150px',
    children: (
      <>
        <Card>1</Card>
        <Card>2</Card>
        <Card>3</Card>
        <Card>4</Card>
        <Card>5</Card>
        <Card>6</Card>
        <Card>7</Card>
        <Card>8</Card>
      </>
    ),
  },
};

export const LargeMinWidth: Story = {
  name: 'Spacious Grid (300px)',
  args: {
    gap: 'lg',
    min: '300px',
    children: (
      <>
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
      </>
    ),
  },
};

export const FixedColumns: Story = {
  name: 'Fixed 3 Columns',
  args: {
    gap: 'md',
    columns: 3,
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

export const TwoColumns: Story = {
  name: 'Fixed 2 Columns',
  args: {
    gap: 'lg',
    columns: 2,
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
  args: {
    gap: 'lg',
    min: '280px',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded mb-4" />
            <h3 className="font-bold mb-2">Product {n}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">$99.99</p>
          </div>
        ))}
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
          <Grid gap={gap} min="100px">
            <Card>1</Card>
            <Card>2</Card>
            <Card>3</Card>
            <Card>4</Card>
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const ImageGallery: Story = {
  args: {
    gap: 'sm',
    min: '200px',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div
            key={n}
            className="aspect-square bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold"
          >
            {n}
          </div>
        ))}
      </>
    ),
  },
};

export const ResponsiveGap: Story = {
  name: 'Responsive Gap',
  render: () => (
    <Grid gap={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }} min="200px">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Card key={n}>{n}</Card>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Gap adapts to screen size: gap-1 (mobile) → sm:gap-2 → md:gap-4 → lg:gap-6. Resize your browser to see the effect.',
      },
    },
  },
};

export const ResponsiveGapBreakpointsOnly: Story = {
  name: 'Responsive Gap (Breakpoints Only)',
  render: () => (
    <Grid gap={{ md: 'md', lg: 'lg' }} min="200px">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <Card key={n}>{n}</Card>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'No base gap, starts at md breakpoint. Useful when you want no gap on mobile.',
      },
    },
  },
};

export const ResponsiveProductGrid: Story = {
  name: 'Responsive Product Grid',
  render: () => (
    <Grid gap={{ base: 'sm', md: 'md', lg: 'lg' }} min="280px">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div key={n} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="bg-gray-200 dark:bg-gray-700 h-40 rounded mb-4" />
          <h3 className="font-bold mb-2">Product {n}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">$99.99</p>
        </div>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Real-world e-commerce grid with responsive gap. Tighter spacing on mobile, more breathing room on larger screens.',
      },
    },
  },
};

export const ResponsiveGapComparison: Story = {
  name: 'Responsive vs Static Gap',
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">
          {'gap={{ base: "sm", md: "md", lg: "lg" }} (responsive)'}
        </p>
        <Grid gap={{ base: 'sm', md: 'md', lg: 'lg' }} min="150px">
          <Card>1</Card>
          <Card>2</Card>
          <Card>3</Card>
          <Card>4</Card>
        </Grid>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">gap=&quot;md&quot; (static)</p>
        <Grid gap="md" min="150px">
          <Card>1</Card>
          <Card>2</Card>
          <Card>3</Card>
          <Card>4</Card>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compare responsive gap that adapts to screen size vs static gap that stays the same.',
      },
    },
  },
};
