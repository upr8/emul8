import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from './Flex';

const meta = {
  title: 'Layouts/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column', 'rowReverse', 'columnReverse'],
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
      control: 'select',
      options: ['nowrap', 'wrap', 'wrapReverse'],
    },
    gap: {
      control: 'text',
      description: 'Gap size. Supports responsive object syntax (e.g., { base: "sm", md: "md" })',
    },
    inline: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div className="px-4 py-2 bg-blue-500 text-white rounded">{children}</div>
);

export const Default: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <Box>One</Box>
        <Box>Two</Box>
        <Box>Three</Box>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    gap: 'md',
    children: (
      <>
        <Box>One</Box>
        <Box>Two</Box>
        <Box>Three</Box>
      </>
    ),
  },
};

export const CenterBoth: Story = {
  name: 'Center Both Axes',
  args: {
    align: 'center',
    justify: 'center',
    className: 'h-48 bg-gray-100 dark:bg-gray-800 rounded',
    children: <Box>Centered</Box>,
  },
};

export const SpaceBetween: Story = {
  args: {
    justify: 'between',
    className: 'bg-gray-100 dark:bg-gray-800 p-4 rounded',
    children: (
      <>
        <Box>Left</Box>
        <Box>Right</Box>
      </>
    ),
  },
};

export const Wrapping: Story = {
  args: {
    wrap: 'wrap',
    gap: 'sm',
    className: 'max-w-xs',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <Box key={n}>{n}</Box>
        ))}
      </>
    ),
  },
};

export const AllDirections: Story = {
  name: 'Direction Comparison',
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      {(['row', 'column', 'rowReverse', 'columnReverse'] as const).map((direction) => (
        <div key={direction}>
          <p className="text-sm text-gray-500 mb-2">{direction}</p>
          <Flex
            direction={direction}
            gap="sm"
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded min-h-32"
          >
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const AllAlignments: Story = {
  name: 'Alignment Comparison',
  render: () => (
    <div className="space-y-4">
      {(['start', 'center', 'end', 'stretch', 'baseline'] as const).map((align) => (
        <div key={align}>
          <p className="text-sm text-gray-500 mb-2">align=&quot;{align}&quot;</p>
          <Flex align={align} gap="md" className="h-20 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <div className="px-4 py-1 bg-blue-500 text-white rounded text-sm">Small</div>
            <div className="px-4 py-4 bg-blue-500 text-white rounded">Large</div>
            <div className="px-4 py-2 bg-blue-500 text-white rounded">Medium</div>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

export const InlineFlex: Story = {
  name: 'Inline Flex',
  render: () => (
    <p>
      This is text with an{' '}
      <Flex
        inline
        align="center"
        gap="xs"
        className="bg-yellow-100 dark:bg-yellow-900 px-2 rounded"
      >
        <span>inline</span>
        <span className="font-bold">flex</span>
      </Flex>{' '}
      container embedded in it.
    </p>
  ),
};

export const ResponsiveGap: Story = {
  name: 'Responsive Gap',
  render: () => (
    <Flex gap={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }} wrap="wrap" className="max-w-md">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
        <Box key={n}>{n}</Box>
      ))}
    </Flex>
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

export const ResponsiveToolbar: Story = {
  name: 'Responsive Toolbar',
  render: () => (
    <Flex
      gap={{ base: 'sm', md: 'md', lg: 'lg' }}
      align="center"
      justify="between"
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded"
    >
      <Flex gap={{ base: 'xs', md: 'sm' }} align="center">
        <div className="w-8 h-8 bg-blue-500 rounded" />
        <span className="font-bold">App Name</span>
      </Flex>
      <Flex gap={{ base: 'xs', md: 'sm' }} align="center">
        <button type="button" className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm">
          Settings
        </button>
        <button type="button" className="px-3 py-1 bg-blue-500 text-white rounded text-sm">
          New
        </button>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar with responsive spacing - tighter on mobile, more spacious on desktop.',
      },
    },
  },
};

export const ResponsiveCardLayout: Story = {
  name: 'Responsive Card Layout',
  render: () => (
    <Flex direction="column" gap={{ base: 'sm', md: 'md', lg: 'lg' }} className="max-w-sm">
      <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded" />
      <Flex direction="column" gap={{ base: 'xs', md: 'sm' }}>
        <h3 className="text-lg font-bold">Card Title</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Card description with some text content that explains what this card is about.
        </p>
      </Flex>
      <Flex gap={{ base: 'xs', md: 'sm' }}>
        <button type="button" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded">
          Primary
        </button>
        <button type="button" className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Secondary
        </button>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Card with responsive gap in all sections - compact on mobile, more breathing room on desktop.',
      },
    },
  },
};

export const ResponsiveNavigation: Story = {
  name: 'Responsive Navigation',
  render: () => (
    <Flex gap={{ base: 'md', lg: 'lg' }} align="center" className="p-4">
      <Flex gap={{ base: 'xs', md: 'sm' }} align="center">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg" />
        <span className="font-bold text-lg">Brand</span>
      </Flex>
      <Flex gap={{ base: 'sm', lg: 'md' }} align="center" className="ml-auto">
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          Home
        </a>
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          Products
        </a>
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          About
        </a>
        <a
          href="#"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          Contact
        </a>
      </Flex>
    </Flex>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation bar with responsive spacing between brand and nav items.',
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
        <Flex gap={{ base: 'sm', md: 'md', lg: 'lg' }}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">gap=&quot;md&quot; (static)</p>
        <Flex gap="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
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
