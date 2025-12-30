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
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
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
