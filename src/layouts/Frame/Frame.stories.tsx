import type { Meta, StoryObj } from '@storybook/react-vite';
import { Frame } from './Frame';

const meta = {
  title: 'Layouts/Frame',
  component: Frame,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    ratio: {
      control: 'select',
      options: [
        'square',
        'video',
        'classic',
        'portrait',
        'ultrawide',
        'golden',
        '16:9',
        '4:3',
        '1:1',
      ],
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'none'],
    },
  },
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ratio: 'video',
    className: 'max-w-lg',
    children: (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
        16:9 Video
      </div>
    ),
  },
};

export const Square: Story = {
  args: {
    ratio: 'square',
    className: 'max-w-xs',
    children: (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
        Square
      </div>
    ),
  },
};

export const Classic: Story = {
  name: '4:3 (Classic)',
  args: {
    ratio: 'classic',
    className: 'max-w-md',
    children: (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
        Classic 4:3
      </div>
    ),
  },
};

export const Ultrawide: Story = {
  name: '21:9 (Ultrawide)',
  args: {
    ratio: 'ultrawide',
    className: 'max-w-xl',
    children: (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
        Ultrawide
      </div>
    ),
  },
};

export const Portrait: Story = {
  name: '9:16 (Portrait)',
  args: {
    ratio: 'portrait',
    className: 'max-w-xs',
    children: (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
        Portrait
      </div>
    ),
  },
};

export const ObjectFitContain: Story = {
  name: 'Object Fit: Contain',
  args: {
    ratio: 'video',
    fit: 'contain',
    className: 'max-w-lg bg-gray-100 dark:bg-gray-800',
    children: (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-32 h-32 flex items-center justify-center text-white text-sm font-bold">
        Contained
      </div>
    ),
  },
};

export const VideoPlaceholder: Story = {
  args: {
    ratio: 'video',
    className: 'max-w-2xl bg-black rounded-lg overflow-hidden',
    children: (
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
        </div>
        <p className="text-lg">Click to play video</p>
      </div>
    ),
  },
};

export const AllPresets: Story = {
  name: 'Preset Comparison',
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {(['square', 'video', 'classic', 'portrait', 'ultrawide', 'golden'] as const).map(
        (preset) => (
          <div key={preset}>
            <p className="text-sm text-gray-500 mb-2">{preset}</p>
            <Frame ratio={preset}>
              <div className="bg-blue-200 dark:bg-blue-800 flex items-center justify-center font-mono text-sm">
                {preset}
              </div>
            </Frame>
          </div>
        )
      )}
    </div>
  ),
};

export const ThumbnailGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-2 max-w-lg">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
        <Frame key={n} ratio="square">
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-2xl font-bold">
            {n}
          </div>
        </Frame>
      ))}
    </div>
  ),
};
