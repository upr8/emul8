import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from './Section';

const meta = {
  title: 'Layouts/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'bg-gray-100 dark:bg-gray-800',
    children: (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Section Title</h2>
        <p className="text-gray-600 dark:text-gray-400">
          This is a section with default spacing. Sections help organize content into distinct
          areas.
        </p>
      </div>
    ),
  },
};

export const AllSizes: Story = {
  name: 'Size Comparison',
  render: () => (
    <div>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size, index) => (
        <Section
          key={size}
          size={size}
          className={index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-500 mb-2">size=&quot;{size}&quot;</p>
            <h2 className="text-xl font-bold">Section with {size} spacing</h2>
          </div>
        </Section>
      ))}
    </div>
  ),
};

export const LandingPage: Story = {
  name: 'Landing Page Example',
  render: () => (
    <div>
      <Section size="xl" className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Product</h1>
          <p className="text-xl opacity-90">The best solution for your needs</p>
        </div>
      </Section>

      <Section size="lg" className="bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-3 gap-8">
            {['Fast', 'Secure', 'Reliable'].map((feature) => (
              <div key={feature} className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-4" />
                <h3 className="font-semibold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section size="lg" className="bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <button type="button" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Sign Up Now
          </button>
        </div>
      </Section>
    </div>
  ),
};

export const WithDifferentPadding: Story = {
  name: 'Padding Comparison',
  render: () => (
    <div>
      {(['none', 'sm', 'md', 'lg'] as const).map((padding, index) => (
        <Section
          key={padding}
          size="sm"
          padding={padding}
          className={index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded">
            <p className="text-sm">padding=&quot;{padding}&quot;</p>
          </div>
        </Section>
      ))}
    </div>
  ),
};
