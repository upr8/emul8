import type { Meta, StoryObj } from '@storybook/react-vite';
import { Wrap } from './Wrap';

const meta = {
  title: 'Layouts/Wrap',
  component: Wrap,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    gap: {
      control: 'text',
      description: 'Gap size. Supports responsive object syntax (e.g., { base: "sm", md: "md" })',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof Wrap>;

export default meta;
type Story = StoryObj<typeof meta>;

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm">{children}</span>
);

export const Default: Story = {
  args: {
    gap: 'sm',
    className: 'max-w-md',
    children: (
      <>
        <Tag>JavaScript</Tag>
        <Tag>TypeScript</Tag>
        <Tag>React</Tag>
        <Tag>Vue</Tag>
        <Tag>Angular</Tag>
        <Tag>Svelte</Tag>
        <Tag>Node.js</Tag>
        <Tag>Deno</Tag>
        <Tag>Bun</Tag>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    gap: 'sm',
    justify: 'center',
    className: 'max-w-md',
    children: (
      <>
        <Tag>One</Tag>
        <Tag>Two</Tag>
        <Tag>Three</Tag>
        <Tag>Four</Tag>
        <Tag>Five</Tag>
      </>
    ),
  },
};

export const ButtonGroup: Story = {
  name: 'Button Group',
  args: {
    gap: 'sm',
    children: (
      <>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Edit
        </button>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Delete
        </button>
        <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Share
        </button>
        <button type="button" className="px-4 py-2 bg-blue-700 text-white rounded">
          Save
        </button>
      </>
    ),
  },
};

export const FilterChips: Story = {
  name: 'Filter Chips',
  args: {
    gap: 'xs',
    className: 'max-w-sm',
    children: (
      <>
        {['All', 'Active', 'Completed', 'Pending', 'Cancelled', 'Archived'].map((filter) => (
          <button
            key={filter}
            type="button"
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {filter}
          </button>
        ))}
      </>
    ),
  },
};

export const AllGaps: Story = {
  name: 'Gap Sizes',
  render: () => (
    <div className="space-y-6">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <div key={gap}>
          <p className="text-sm text-gray-500 mb-2">gap=&quot;{gap}&quot;</p>
          <Wrap gap={gap} className="max-w-xs bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <Tag>A</Tag>
            <Tag>B</Tag>
            <Tag>C</Tag>
            <Tag>D</Tag>
            <Tag>E</Tag>
          </Wrap>
        </div>
      ))}
    </div>
  ),
};

export const VariableWidths: Story = {
  name: 'Variable Width Items',
  args: {
    gap: 'sm',
    className: 'max-w-md',
    children: (
      <>
        <Tag>Short</Tag>
        <Tag>A bit longer</Tag>
        <Tag>X</Tag>
        <Tag>Medium length text</Tag>
        <Tag>Tiny</Tag>
        <Tag>This is a much longer tag that takes more space</Tag>
        <Tag>OK</Tag>
      </>
    ),
  },
};

export const ResponsiveGap: Story = {
  name: 'Responsive Gap',
  render: () => (
    <Wrap gap={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }} className="max-w-md">
      {['JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte', 'Node.js', 'Deno'].map(
        (tag) => (
          <Tag key={tag}>{tag}</Tag>
        )
      )}
    </Wrap>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Gap adapts to screen size: gap-1 (mobile) → sm:gap-2 → md:gap-4 → lg:gap-6. Resize your browser to see the effect.',
      },
    },
  },
};

export const ResponsiveTagCloud: Story = {
  name: 'Responsive Tag Cloud',
  render: () => (
    <Wrap gap={{ base: 'xs', md: 'sm' }} className="max-w-lg">
      {[
        'Design Systems',
        'UI',
        'UX',
        'React',
        'Components',
        'Tailwind',
        'CSS',
        'Accessibility',
        'Responsive',
        'Mobile First',
        'Tokens',
        'Variants',
      ].map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </Wrap>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tag cloud with tighter spacing on mobile, more breathing room on desktop.',
      },
    },
  },
};

export const ResponsiveButtonGroup: Story = {
  name: 'Responsive Button Group',
  render: () => (
    <Wrap gap={{ base: 'xs', md: 'sm' }} className="max-w-sm">
      <button type="button" className="px-4 py-2 bg-blue-700 text-white rounded">
        Save
      </button>
      <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
        Cancel
      </button>
      <button type="button" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
        Reset
      </button>
      <button type="button" className="px-4 py-2 bg-red-700 text-white rounded">
        Delete
      </button>
    </Wrap>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button group that wraps with responsive spacing.',
      },
    },
  },
};

export const ResponsiveFilterChips: Story = {
  name: 'Responsive Filter Chips',
  render: () => (
    <Wrap gap={{ base: 'xs', sm: 'sm', md: 'md' }} className="max-w-md">
      {['All', 'Active', 'Completed', 'Pending', 'Cancelled', 'Archived', 'Draft'].map(
        (filter, i) => (
          <button
            key={filter}
            type="button"
            className={`px-3 py-1 text-sm rounded-full transition ${
              i === 0
                ? 'bg-blue-700 text-white'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {filter}
          </button>
        )
      )}
    </Wrap>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Filter chips with responsive gap - compact on mobile for better touch targets.',
      },
    },
  },
};

export const ResponsiveSkillBadges: Story = {
  name: 'Responsive Skill Badges',
  render: () => (
    <div className="space-y-4 max-w-lg">
      <div>
        <p className="text-sm text-gray-500 mb-2">Frontend</p>
        <Wrap gap={{ base: 'xs', md: 'sm' }}>
          {['React', 'Vue', 'TypeScript', 'Tailwind'].map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </Wrap>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Backend</p>
        <Wrap gap={{ base: 'xs', md: 'sm' }}>
          {['Node.js', 'Python', 'Go', 'PostgreSQL'].map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </Wrap>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Skill badges organized in categories with responsive spacing.',
      },
    },
  },
};

export const ResponsiveGapComparison: Story = {
  name: 'Responsive vs Static Gap',
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">
          {'gap={{ base: "sm", md: "md", lg: "lg" }} (responsive)'}
        </p>
        <Wrap
          gap={{ base: 'sm', md: 'md', lg: 'lg' }}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded"
        >
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
          <Tag>D</Tag>
          <Tag>E</Tag>
        </Wrap>
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2 font-mono">gap=&quot;md&quot; (static)</p>
        <Wrap gap="md" className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
          <Tag>D</Tag>
          <Tag>E</Tag>
        </Wrap>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compare responsive gap that adapts to screen size vs static gap.',
      },
    },
  },
};
