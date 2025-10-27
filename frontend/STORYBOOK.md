# Storybook Documentation

This project uses [Storybook](https://storybook.js.org/) for component documentation and development.

## Prerequisites

- Node.js 20 or higher
- The project dependencies installed

## Getting Started

### Running Storybook

To start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`.

### Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

The built static files will be in the `storybook-static` directory.

## Documentation Structure

### Shared Components

Documentation for custom shared components:

- **Header** - The main application header with task counts, theme toggle, and language selection
- **NumericBadge** - Badge component for displaying numeric values with custom colors and tooltips
- **Pagination** - Interactive pagination component with page navigation

Each component includes:

- Interactive examples
- Props documentation
- Usage examples
- Visual demonstrations

### UI Components

UI components (located in `src/components/ui`) are built with [shadcn/ui](https://ui.shadcn.com/).

For complete documentation, props, and advanced examples, refer to the official shadcn/ui documentation:

- [Alert](https://ui.shadcn.com/docs/components/alert)
- [Button](https://ui.shadcn.com/docs/components/button)
- [Dialog](https://ui.shadcn.com/docs/components/dialog)
- [Textarea](https://ui.shadcn.com/docs/components/textarea)
- [Tooltip](https://ui.shadcn.com/docs/components/tooltip)

## Writing Stories

Stories are located alongside their components or in dedicated story files:

- `*.stories.tsx` - Story files
- Stories use the CSF (Component Story Format)

Example story structure:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import MyComponent from './MyComponent';

const meta = {
  title: 'Category/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## Features

- **Interactivity** - All components are fully interactive in Storybook
- **Controls** - Adjust component props in real-time
- **Responsive** - Test components at different viewport sizes
- **Dark Mode** - Toggle between light and dark themes
- **i18n Support** - Components support both English and Arabic languages
- **Accessibility** - View and test ARIA labels and keyboard navigation

## Additional Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [React Storybook Tutorial](https://storybook.js.org/docs/react/get-started/introduction)
