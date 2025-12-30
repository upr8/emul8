import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from './Box';

const meta = {
  title: 'Layouts/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    borderWidth: {
      control: 'select',
      options: ['none', 'thin', 'medium', 'thick'],
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Content inside a box with default padding</p>,
  },
};

export const WithBorder: Story = {
  args: {
    borderWidth: 'thin',
    children: <p>Box with a thin border</p>,
  },
};

export const AllPaddings: Story = {
  name: 'Padding Sizes',
  render: () => (
    <div className="space-y-4">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
        <Box key={padding} padding={padding} borderWidth="thin">
          <p className="font-mono text-sm">padding="{padding}"</p>
        </Box>
      ))}
    </div>
  ),
};

export const AllBorderWidths: Story = {
  name: 'Border Widths',
  render: () => (
    <div className="space-y-4">
      {(['none', 'thin', 'medium', 'thick'] as const).map((borderWidth) => (
        <Box key={borderWidth} borderWidth={borderWidth} padding="md">
          <p className="font-mono text-sm">borderWidth="{borderWidth}"</p>
        </Box>
      ))}
    </div>
  ),
};
