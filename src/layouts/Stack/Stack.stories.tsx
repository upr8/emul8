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
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
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
