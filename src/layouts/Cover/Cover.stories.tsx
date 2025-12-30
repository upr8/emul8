import type { Meta, StoryObj } from '@storybook/react-vite';
import { Cover } from './Cover';

const meta = {
  title: 'Layouts/Cover',
  component: Cover,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    minHeight: {
      control: 'text',
    },
    noPad: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Cover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    minHeight: '400px',
    children: (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600 dark:text-gray-400">This content is vertically centered</p>
      </div>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    minHeight: '500px',
    gap: 'md',
    top: (
      <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <span className="font-bold">Logo</span>
        <nav className="space-x-4">
          <button type="button" className="hover:underline">
            Home
          </button>
          <button type="button" className="hover:underline">
            About
          </button>
          <button type="button" className="hover:underline">
            Contact
          </button>
        </nav>
      </header>
    ),
    bottom: (
      <footer className="p-4 border-t dark:border-gray-700 text-center text-sm text-gray-500">
        © 2024 Company Name
      </footer>
    ),
    children: (
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Hero Section</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Centered between header and footer
        </p>
        <button type="button" className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium">
          Get Started
        </button>
      </div>
    ),
  },
};

export const FullViewport: Story = {
  args: {
    minHeight: '100vh',
    className: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white',
    children: (
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-6">Full Viewport Cover</h1>
        <p className="text-xl opacity-90">Takes up the entire screen height</p>
      </div>
    ),
  },
};

export const LoginPage: Story = {
  args: {
    minHeight: '100vh',
    className: 'bg-gray-100 dark:bg-gray-900',
    children: (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                placeholder="••••••••"
              />
            </div>
            <button
              type="button"
              className="w-full py-2 bg-blue-500 text-white rounded font-medium"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    minHeight: '400px',
    noPad: true,
    className: 'bg-blue-100 dark:bg-blue-900',
    children: (
      <div className="text-center">
        <p>No padding on the cover container</p>
      </div>
    ),
  },
};

export const CustomHeight: Story = {
  args: {
    minHeight: '300px',
    className: 'bg-gray-200 dark:bg-gray-800 rounded-lg',
    children: (
      <div className="text-center">
        <h2 className="text-2xl font-bold">300px Height</h2>
        <p className="text-gray-600 dark:text-gray-400">Custom minimum height</p>
      </div>
    ),
  },
};
