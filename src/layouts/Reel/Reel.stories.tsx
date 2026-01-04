import type { Meta, StoryObj } from '@storybook/react-vite';
import { Reel } from './Reel';

const meta = {
  title: 'Layouts/Reel',
  component: Reel,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    itemWidth: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    noBar: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Reel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded min-w-[200px]">{children}</div>
);

export const Default: Story = {
  args: {
    gap: 'md',
    children: (
      <>
        <Card>Card 1</Card>
        <Card>Card 2</Card>
        <Card>Card 3</Card>
        <Card>Card 4</Card>
        <Card>Card 5</Card>
        <Card>Card 6</Card>
      </>
    ),
  },
};

export const FixedWidth: Story = {
  args: {
    gap: 'md',
    itemWidth: '280px',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="bg-blue-100 dark:bg-blue-900 p-6 rounded h-40 flex items-center justify-center"
          >
            <span className="text-2xl font-bold">Card {n}</span>
          </div>
        ))}
      </>
    ),
  },
};

export const NoScrollbar: Story = {
  args: {
    gap: 'md',
    noBar: true,
    children: (
      <>
        <Card>No scrollbar</Card>
        <Card>Swipe to scroll</Card>
        <Card>On touch devices</Card>
        <Card>Card 4</Card>
        <Card>Card 5</Card>
      </>
    ),
  },
};

export const CustomHeight: Story = {
  args: {
    gap: 'md',
    height: '200px',
    children: (
      <>
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded min-w-[150px] h-full flex items-center justify-center text-white text-xl font-bold"
          >
            {n}
          </div>
        ))}
      </>
    ),
  },
};

export const ProductCarousel: Story = {
  args: {
    gap: 'lg',
    itemWidth: '250px',
    children: (
      <>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 dark:bg-gray-700 h-40" />
            <div className="p-4">
              <h3 className="font-bold mb-1">Product {n}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Short description</p>
              <p className="font-bold text-blue-600">$99.99</p>
            </div>
          </div>
        ))}
      </>
    ),
  },
};

export const AllGaps: Story = {
  name: 'Gap Sizes',
  render: () => (
    <div className="space-y-8">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">gap: {gap}</p>
          {/* oxlint-disable-next-line jsx-a11y/aria-proptypes -- dynamic aria-label intentional for demo */}
          <Reel gap={gap} aria-label={`Example reel with ${gap} gap`}>
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="bg-blue-100 dark:bg-blue-900 px-6 py-4 rounded">
                Item {n}
              </div>
            ))}
          </Reel>
        </div>
      ))}
    </div>
  ),
};
