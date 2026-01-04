import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';

const meta = {
  title: 'Layouts/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    gap: {
      control: 'text',
      description: 'Gap size. Supports responsive object syntax (e.g., { base: "sm", md: "md" })',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
    wrap: {
      control: 'boolean',
    },
    splitAfter: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded">{children}</div>
);

export const Default: Story = {
  args: { gap: 'md', direction: 'vertical' },
  render: (args) => (
    <Stack {...args}>
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const Horizontal: Story = {
  args: { gap: 'md', direction: 'horizontal' },
  render: (args) => (
    <Stack {...args}>
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
    </Stack>
  ),
};

export const AllGaps: Story = {
  name: 'Gap Sizes',
  render: () => (
    <Stack gap="xl" direction="vertical">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-500 mb-2">gap: {gap}</p>
          <Stack gap={gap} direction="horizontal">
            <DemoBox>A</DemoBox>
            <DemoBox>B</DemoBox>
            <DemoBox>C</DemoBox>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
};

export const SplitAfter: Story = {
  name: 'Split After (Sticky Footer)',
  render: () => (
    <Stack gap="md" splitAfter={0} className="h-64 border border-gray-300 rounded p-4">
      <DemoBox>Header (stays at top)</DemoBox>
      <DemoBox>Content pushed down</DemoBox>
      <DemoBox>Footer at bottom</DemoBox>
    </Stack>
  ),
};

export const ResponsiveGap: Story = {
  name: 'Responsive Gap',
  render: () => (
    <Stack gap={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }} direction="vertical">
      <DemoBox>Item 1</DemoBox>
      <DemoBox>Item 2</DemoBox>
      <DemoBox>Item 3</DemoBox>
      <DemoBox>Item 4</DemoBox>
    </Stack>
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

export const ResponsiveHorizontalStack: Story = {
  name: 'Responsive Horizontal Stack',
  render: () => (
    <Stack gap={{ base: 'sm', md: 'md', lg: 'lg' }} direction="horizontal" align="center">
      <DemoBox>Logo</DemoBox>
      <DemoBox>Nav</DemoBox>
      <DemoBox>Search</DemoBox>
      <DemoBox>Profile</DemoBox>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Horizontal navigation with responsive spacing. Great for headers and toolbars.',
      },
    },
  },
};

export const ResponsiveFormLayout: Story = {
  name: 'Responsive Form Layout',
  render: () => (
    <Stack gap={{ base: 'sm', md: 'md' }} className="max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded"
          placeholder="********"
        />
      </div>
      <button type="button" className="w-full px-4 py-2 bg-blue-700 text-white rounded">
        Sign In
      </button>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Form with responsive gap - tighter on mobile for more compact forms, more spacing on desktop.',
      },
    },
  },
};

export const ResponsiveSplitLayout: Story = {
  name: 'Responsive Split Layout',
  render: () => (
    <Stack
      gap={{ base: 'sm', md: 'md' }}
      splitAfter={0}
      className="h-64 border border-gray-300 dark:border-gray-600 rounded p-4"
    >
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
        <h2 className="font-bold">Header</h2>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded flex-1">Main content</div>
      <div className="bg-green-100 dark:bg-green-900 p-4 rounded">Footer</div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Combines responsive gap with splitAfter for adaptive page layouts.',
      },
    },
  },
};

export const ResponsiveGapComparison: Story = {
  name: 'Responsive vs Static Gap',
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">
          {'gap={{ base: "sm", md: "md", lg: "lg" }}'}
        </p>
        <Stack gap={{ base: 'sm', md: 'md', lg: 'lg' }}>
          <DemoBox>1</DemoBox>
          <DemoBox>2</DemoBox>
          <DemoBox>3</DemoBox>
        </Stack>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">gap=&quot;md&quot;</p>
        <Stack gap="md">
          <DemoBox>1</DemoBox>
          <DemoBox>2</DemoBox>
          <DemoBox>3</DemoBox>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compare responsive gap that adapts to screen size vs static gap.',
      },
    },
  },
};
