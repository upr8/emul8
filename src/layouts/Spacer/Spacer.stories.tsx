import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from './Spacer';

const meta = {
  title: 'Layouts/Spacer',
  component: Spacer,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'auto'],
    },
  },
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <div className="px-4 py-2 bg-blue-500 text-white rounded">Left</div>
      <Spacer />
      <div className="px-4 py-2 bg-blue-500 text-white rounded">Right</div>
    </div>
  ),
};

export const InVerticalStack: Story = {
  name: 'In Vertical Stack',
  render: () => (
    <div className="flex flex-col h-64 p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <div className="px-4 py-2 bg-blue-500 text-white rounded">Header</div>
      <Spacer />
      <div className="px-4 py-2 bg-blue-500 text-white rounded">Footer</div>
    </div>
  ),
};

export const MultipleSpacers: Story = {
  name: 'Multiple Spacers',
  render: () => (
    <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <div className="px-4 py-2 bg-blue-500 text-white rounded">A</div>
      <Spacer />
      <div className="px-4 py-2 bg-green-500 text-white rounded">B</div>
      <Spacer />
      <div className="px-4 py-2 bg-purple-500 text-white rounded">C</div>
    </div>
  ),
};

export const FixedSizes: Story = {
  name: 'Fixed Sizes',
  render: () => (
    <div className="space-y-4">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size} className="flex items-center p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <div className="px-4 py-2 bg-blue-500 text-white rounded">Item</div>
          <Spacer size={size} className="bg-red-200" />
          <div className="px-4 py-2 bg-blue-500 text-white rounded">Item</div>
          <span className="ml-4 text-sm text-gray-500">size=&quot;{size}&quot;</span>
        </div>
      ))}
    </div>
  ),
};

export const NavbarExample: Story = {
  name: 'Navbar Example',
  render: () => (
    <div className="flex items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="text-xl font-bold">Logo</div>
      <Spacer />
      <nav className="flex gap-4">
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900">
          Home
        </a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900">
          About
        </a>
        <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900">
          Contact
        </a>
      </nav>
    </div>
  ),
};
