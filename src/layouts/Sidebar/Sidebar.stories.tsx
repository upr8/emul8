import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Layouts/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
    },
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    sideWidth: {
      control: 'text',
    },
    contentMin: {
      control: 'text',
    },
    noStretch: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SidebarContent = () => (
  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded h-full min-h-[200px]">
    <h3 className="font-bold mb-4">Sidebar</h3>
    <ul className="space-y-2 text-sm">
      <li>Menu Item 1</li>
      <li>Menu Item 2</li>
      <li>Menu Item 3</li>
    </ul>
  </div>
);

const MainContent = () => (
  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded min-h-[200px]">
    <h2 className="text-xl font-bold mb-4">Main Content</h2>
    <p className="text-gray-600 dark:text-gray-400">
      This is the main content area. It will grow to fill available space while the sidebar
      maintains its fixed width.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    sidebar: <SidebarContent />,
    sideWidth: '200px',
    gap: 'md',
    children: <MainContent />,
  },
};

export const SidebarOnRight: Story = {
  args: {
    sidebar: <SidebarContent />,
    side: 'right',
    sideWidth: '200px',
    gap: 'md',
    children: <MainContent />,
  },
};

export const WiderSidebar: Story = {
  args: {
    sidebar: <SidebarContent />,
    sideWidth: '300px',
    gap: 'lg',
    children: <MainContent />,
  },
};

export const NoStretch: Story = {
  args: {
    sidebar: (
      <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
        <p>Short sidebar content</p>
      </div>
    ),
    sideWidth: '200px',
    gap: 'md',
    noStretch: true,
    children: <MainContent />,
  },
};

export const HigherContentMin: Story = {
  name: 'Early Wrap (70% contentMin)',
  args: {
    sidebar: <SidebarContent />,
    sideWidth: '200px',
    contentMin: '70%',
    gap: 'md',
    children: (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <p>Content with 70% minimum width (will wrap sooner)</p>
      </div>
    ),
  },
};

export const DashboardLayout: Story = {
  args: {
    sidebar: (
      <div className="bg-gray-900 text-white p-4 rounded min-h-[400px]">
        <h2 className="font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <button type="button" className="block w-full text-left px-3 py-2 bg-blue-600 rounded">
            Overview
          </button>
          <button
            type="button"
            className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded"
          >
            Analytics
          </button>
          <button
            type="button"
            className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded"
          >
            Reports
          </button>
          <button
            type="button"
            className="block w-full text-left px-3 py-2 hover:bg-gray-800 rounded"
          >
            Settings
          </button>
        </nav>
      </div>
    ),
    sideWidth: '240px',
    gap: 'none',
    children: (
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded min-h-[400px]">
        <h1 className="text-2xl font-bold mb-4">Overview</h1>
        <div className="grid grid-cols-3 gap-4">
          {['Revenue', 'Users', 'Orders'].map((stat) => (
            <div key={stat} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <p className="text-gray-500 text-sm">{stat}</p>
              <p className="text-2xl font-bold">$12,345</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};
