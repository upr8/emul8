import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';

const meta = {
  title: 'Layouts/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell className="h-screen">
      <AppShell.Header className="flex items-center px-4">
        <span className="font-bold">My App</span>
      </AppShell.Header>
      <AppShell.Body>
        <AppShell.Sidebar className="p-4">
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded bg-blue-100 dark:bg-blue-900">
              Dashboard
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Projects
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Settings
            </a>
          </nav>
        </AppShell.Sidebar>
        <AppShell.Main>
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome to your dashboard.</p>
        </AppShell.Main>
      </AppShell.Body>
    </AppShell>
  ),
};

export const WithFooter: Story = {
  name: 'With Footer',
  render: () => (
    <AppShell className="h-screen">
      <AppShell.Header className="flex items-center px-4">
        <span className="font-bold">My App</span>
      </AppShell.Header>
      <AppShell.Body>
        <AppShell.Sidebar className="p-4">
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded bg-blue-100 dark:bg-blue-900">
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              About
            </a>
          </nav>
        </AppShell.Sidebar>
        <AppShell.Main>
          <h1 className="text-2xl font-bold mb-4">Content</h1>
          <p className="text-gray-600 dark:text-gray-400">Main content area.</p>
        </AppShell.Main>
      </AppShell.Body>
      <AppShell.Footer className="text-center text-sm text-gray-500">
        © 2024 My App. All rights reserved.
      </AppShell.Footer>
    </AppShell>
  ),
};

export const RightSidebar: Story = {
  name: 'Right Sidebar',
  render: () => (
    <AppShell className="h-screen">
      <AppShell.Header className="flex items-center px-4">
        <span className="font-bold">My App</span>
      </AppShell.Header>
      <AppShell.Body>
        <AppShell.Main>
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sidebar is on the right side of the layout.
          </p>
        </AppShell.Main>
        <AppShell.Sidebar position="right" className="p-4">
          <h3 className="font-semibold mb-4">Details Panel</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Status: Active</p>
            <p>Last updated: Today</p>
          </div>
        </AppShell.Sidebar>
      </AppShell.Body>
    </AppShell>
  ),
};

export const DoubleSidebar: Story = {
  name: 'Double Sidebar',
  render: () => (
    <AppShell className="h-screen">
      <AppShell.Header className="flex items-center px-4">
        <span className="font-bold">My App</span>
      </AppShell.Header>
      <AppShell.Body>
        <AppShell.Sidebar width="sm" className="p-2">
          <nav className="space-y-1">
            {['🏠', '📁', '⚙️', '👤'].map((icon) => (
              <a
                key={icon}
                href="#"
                className="block p-3 rounded text-center hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {icon}
              </a>
            ))}
          </nav>
        </AppShell.Sidebar>
        <AppShell.Main>
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p className="text-gray-600 dark:text-gray-400">Content with double sidebars.</p>
        </AppShell.Main>
        <AppShell.Sidebar position="right" width="sm" className="p-4">
          <h3 className="font-semibold mb-2 text-sm">Quick Actions</h3>
          <div className="space-y-2">
            <button
              type="button"
              className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              New File
            </button>
            <button
              type="button"
              className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Upload
            </button>
          </div>
        </AppShell.Sidebar>
      </AppShell.Body>
    </AppShell>
  ),
};

export const NoSidebar: Story = {
  name: 'Without Sidebar',
  render: () => (
    <AppShell className="h-screen">
      <AppShell.Header className="flex items-center justify-between px-4">
        <span className="font-bold">My App</span>
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
      </AppShell.Header>
      <AppShell.Main maxWidth="lg" className="mx-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A simple layout without a sidebar, with centered content.
        </p>
      </AppShell.Main>
      <AppShell.Footer className="text-center text-sm text-gray-500">© 2024 My App</AppShell.Footer>
    </AppShell>
  ),
};

export const SidebarWidths: Story = {
  name: 'Sidebar Widths',
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg'] as const).map((width) => (
        <div
          key={width}
          className="border border-gray-200 dark:border-gray-700 rounded overflow-hidden"
        >
          <p className="p-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800">
            width=&quot;{width}&quot;
          </p>
          <AppShell className="h-48">
            <AppShell.Body>
              <AppShell.Sidebar width={width} className="p-4">
                <p className="text-sm">Sidebar</p>
              </AppShell.Sidebar>
              <AppShell.Main>
                <p className="text-sm text-gray-500">Main content</p>
              </AppShell.Main>
            </AppShell.Body>
          </AppShell>
        </div>
      ))}
    </div>
  ),
};
