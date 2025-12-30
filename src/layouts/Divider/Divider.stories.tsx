import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Layouts/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <p>Content above the divider</p>
      <Divider />
      <p>Content below the divider</p>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="space-y-4">
      <p>First section</p>
      <Divider {...args} />
      <p>Second section</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex items-center gap-4 h-12">
      <span>Left</span>
      <Divider {...args} />
      <span>Right</span>
    </div>
  ),
};

export const Sizes: Story = {
  name: 'Size Comparison',
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size}>
          <p className="text-sm text-gray-500 mb-2">size=&quot;{size}&quot;</p>
          <Divider size={size} />
        </div>
      ))}
    </div>
  ),
};

export const VerticalSizes: Story = {
  name: 'Vertical Sizes',
  render: () => (
    <div className="flex gap-8 h-16 items-center">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4 h-full">
          <span className="text-sm text-gray-500">{size}</span>
          <Divider orientation="vertical" size={size} />
          <span className="text-sm text-gray-500">content</span>
        </div>
      ))}
    </div>
  ),
};

export const InList: Story = {
  name: 'In List',
  render: () => (
    <ul className="divide-y-0">
      {['Apple', 'Banana', 'Cherry', 'Date'].map((fruit, index, arr) => (
        <li key={fruit}>
          <div className="py-3">{fruit}</div>
          {index < arr.length - 1 && <Divider />}
        </li>
      ))}
    </ul>
  ),
};

export const InNavigation: Story = {
  name: 'In Navigation',
  render: () => (
    <nav className="flex items-center gap-4">
      <a href="#" className="text-blue-600 hover:underline">
        Home
      </a>
      <Divider orientation="vertical" className="h-4" />
      <a href="#" className="text-blue-600 hover:underline">
        Products
      </a>
      <Divider orientation="vertical" className="h-4" />
      <a href="#" className="text-blue-600 hover:underline">
        About
      </a>
      <Divider orientation="vertical" className="h-4" />
      <a href="#" className="text-blue-600 hover:underline">
        Contact
      </a>
    </nav>
  ),
};

export const CustomColor: Story = {
  name: 'Custom Colors',
  render: () => (
    <div className="space-y-4">
      <Divider className="bg-blue-500 opacity-100" />
      <Divider className="bg-red-500 opacity-100" />
      <Divider className="bg-green-500 opacity-100" />
    </div>
  ),
};
