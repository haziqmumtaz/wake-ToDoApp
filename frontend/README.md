# @frontend-todo/frontend

A React frontend application built with TypeScript and Tailwind CSS for the WakeCap TODO application takehome task. This frontend provides a modern, responsive interface for managing tasks with features like pagination, real-time task counts, dark mode, internationalization (i18n), and comprehensive form validation.

> **Note**: This frontend is part of a monorepo workspace. See the [root README](../README.md) for overall project documentation and setup instructions.

## Overview

The frontend serves as the user interface for the TODO application, providing:

- **Modern UI/UX** as per mockups provided with dark mode support
- **Task Management** with full CRUD operations through interactive components
- **Real-time Updates** with live task counts and state synchronization
- **Pagination** for efficient handling of large task lists
- **Internationalization** with support for English and Arabic (RTL)
- **Form Validation** with client-side validation using Zod schemas
- **Type Safety** with TypeScript throughout the application
- **Component Library** with Storybook for component documentation
- **Comprehensive Testing** with Vitest and React Testing Library

## Architecture

The frontend follows a **feature-based architecture** pattern organized around business domains.

### Architecture Overview

| Layer                           | Purpose                                         | Location                         |
| ------------------------------- | ----------------------------------------------- | -------------------------------- |
| **Pages**                       | Route components and page-level logic           | `src/features/tasks/pages/`      |
| **Feature Specific Components** | Feature Specific Components                     | `src/features/tasls/components/` |
| **Components**                  | Reusable components                             | `src/components/`                |
| **API**                         | Data fetching and API integration + zod schemas | `src/features/tasks/api/`        |
| **Hooks**                       | Custom React API hooks                          | `src/features/tasks/hooks/`      |
| **Stores**                      | Zustand state management                        | `src/stores/`                    |
| **Types**                       | TypeScript definitions and schemas              | `src/types/`                     |
| **Lib**                         | Shared utilities and HTTP client                | `src/lib/`                       |
| **Locales**                     | i18n translation files                          | `src/locales/`                   |

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root component
│   ├── index.css                   # Global styles
│   ├── components/                 # Reusable UI components
│   │   ├── shared/                 # Shared Advanced components
│   │   │   ├── Header.tsx          # Application header with i18n and theme toggle
│   │   │   ├── Header.spec.tsx     # Header tests
│   │   │   ├── Header.stories.tsx  # Storybook stories
│   │   │   ├── NumericBadge.tsx    # Badge component for counts
│   │   │   ├── Pagination.tsx      # Pagination component
│   │   │   ├── *.stories.tsx      # Component Storybook Stories
│   │   │   └── *.spec.tsx          # Component tests
│   │   └── ui/                     # shadcn/ui components
│   │       ├── button.tsx           # Button component
│   │       ├── dialog.tsx           # Dialog modal component
│   │       ├── textarea.tsx         # Textarea component
│   │       ├── alert.tsx            # Alert component
│   │       ├── tooltip.tsx          # Tooltip component
│   │       ├── UIStories.mdx          # Storybook Doc with links to ShadCN Documentation
│   │       └── *.spec.tsx           # Component tests
│   ├── features/                   # Feature-based modules
│   │   └── tasks/                  # Task management feature
│   │       ├── api/                # API layer
│   │       │   ├── index.ts        # API configuration
│   │       │   ├── schemas.ts      # Zod validation schemas
│   │       │   └── *.spec.ts       # API tests
│   │       ├── components/         # Task-specific components
│   │       │   ├── TaskRow.tsx     # Individual task row component
│   │       │   ├── TaskModal.tsx   # Task create/edit modal
│   │       │   └── *.spec.tsx      # Component tests
│   │       ├── hooks/              # Custom hooks
│   │       │   ├── useGetTasks.ts           # Fetch tasks hook
│   │       │   ├── useGetTaskCounts.ts      # Get task counts hook
│   │       │   ├── useCreateTask.ts         # Create task hook
│   │       │   ├── useUpdateTask.ts         # Update task hook
│   │       │   ├── useDeleteTask.ts         # Delete task hook
│   │       │   └── index.ts                 # Hooks exports
│   │       └── pages/              # Route components
│   │           └── Tasks.tsx       # Main tasks listing page
│   ├── stores/                     # Zustand state management
│   │   ├── useTaskStore.ts        # Task state store
│   │   └── useConfigStore.ts      # App config store (theme, language)
│   ├── lib/                        # Shared utilities
│   │   ├── http.ts                 # HTTP client configuration
│   │   ├── useBaseApi.ts           # Base API hook with loading state and error handling
│   │   ├── i18n.ts                 # i18next configuration
│   │   ├── utils.ts                # Utility functions
│   │   └── *.spec.ts               # Utility tests
│   ├── locales/                    # i18n translation files
│   │   ├── en.json                 # English translations
│   │   └── ar.json                 # Arabic translations
│   ├── types/                      # TypeScript definitions
│   │   ├── core.ts                 # Core types
│   │   └── tasks.ts                # Task type definitions
│   └── test/                       # Test configuration
│       └── setup.ts                # Vitest setup file
├── public/
│   └── vite.svg                    # Public assets
├── components.json                 # shadcn/ui configuration
├── vitest.config.ts                # Test configuration
├── .storybook/                     # Storybook configuration
│   └── main.ts
└── package.json                    # Dependencies and scripts
```

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### Installation

From the root directory:

```bash
# Install all dependencies (frontend + api)
npm run install:all

# Or install only frontend dependencies
cd frontend
npm install
```

### Development

Start both frontend and backend:

```bash
# From root directory
npm run dev
```

Or run only the frontend:

```bash
# From root directory
npm run dev:frontend

# Or from frontend directory
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Available Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Start development server with hot reload |
| `npm run build`           | Build for production with optimization   |
| `npm run preview`         | Preview production build locally         |
| `npm run test`            | Run tests once                           |
| `npm run test:watch`      | Run tests in watch mode                  |
| `npm run test:coverage`   | Run tests with coverage report           |
| `npm run storybook`       | Start Storybook development server       |
| `npm run build-storybook` | Build Storybook for production           |

## Application Features

### Task Management

- **Create Tasks**: Add new tasks with form validation
- **Update Tasks**: Edit existing tasks by double-clicking
- **Complete Tasks**: Toggle task completion status
- **Delete Tasks**: Soft delete tasks with confirmation
- **Pagination**: Navigate through pages of tasks (10 per page)
- **Task Counts**: Real-time display of completed, uncompleted, and deleted tasks

### UI Features

- **Dark Mode**: Toggle between light and dark themes with persistent storage
- **Internationalization**: Switch between English and Arabic with RTL support

### Key Components

| Component        | Purpose                     | Features                                                     |
| ---------------- | --------------------------- | ------------------------------------------------------------ |
| **TaskRow**      | Display individual task     | Toggle completion, delete, double-click to edit              |
| **TaskModal**    | Create/edit tasks           | Form validation, character counting                          |
| **Header**       | App header with controls    | Theme toggle, i18n switcher, task counts, create task button |
| **Pagination**   | Navigate through task pages | Page indicators and navigation                               |
| **NumericBadge** | Display numeric values      | Color-coded badges with tooltips                             |

## Tech Stack

### Core

- **React 19** - UI framework with latest features
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool with instant HMR
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management

- **Zustand** - Lightweight state management

### UI Components

- **Radix UI** - Accessible component primitives
- **shadcn/ui** - High-quality React components
- **React Icons** - Icon library

### Internationalization

- **i18next** - JavaScript internationalization framework
- **react-i18next** - React bindings for i18next

### Validation

- **Zod** - TypeScript-first schema validation

### Testing

- **Vitest** - Fast unit testing framework (substitute for requested jest as it is not supported with vite)
- **React Testing Library** - React component testing utilities
- **@testing-library/user-event** - User interaction testing
- **@testing-library/jest-dom** - Custom matchers for DOM testing

### Documentation

- **Storybook** - Component development environment

## API Integration

The frontend uses custom hooks for data fetching and state management:

### Custom Hooks

- **useGetTasks**: Fetch paginated tasks with query parameters
- **useGetTaskCounts**: Fetch real-time task counts
- **useCreateTask**: Create new tasks
- **useUpdateTask**: Update existing tasks
- **useDeleteTask**: Soft delete tasks

### API Client

The application uses Axios as the HTTP client with centralized configuration in `src/lib/http.ts`.

## State Management

The application uses Zustand for state management with two main stores:

### useTaskStore

Manages task-related state:

- `tasks`: Array of current tasks
- `taskCounts`: Object with completed, uncompleted, and deleted counts
- `selectedTask`: Currently selected task for editing
- `totalPages`: Total number of pages
- `currentPage`: Current page number
- `isModalOpen`: Modal visibility state

### useConfigStore

Manages application configuration:

- `theme`: Current theme ('light' or 'dark')
- `language`: Current language ('en' or 'ar')
- `toggleTheme()`: Toggle between light and dark themes
- `setLanguage()`: Change language and update document direction

## Form Validation

The application uses Zod for comprehensive form validation:

- **Field-level validation** with specific error messages
- **Character counting** for text areas
- **Required field validation** for task text

### Task Schema

```typescript
const taskSchema = z.object({
  text: z
    .string()
    .min(1, 'Task text is required')
    .max(50, 'Task text must be less than 50 characters'),
  	// sanitization checks
  completed: z.boolean(),
  deleted: z.boolean(),
  createdAt: z.string(),
});
```

## Testing

### Test Structure

The frontend includes comprehensive tests:

- **Component Tests**: Test individual React components with user interactions
- **API Tests**: Test API integrations and data fetching
- **Integration Tests**: Test component integration

End to end tests are not currently included

### Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage

The test suite includes:

- Component rendering and interactions
- User events (clicks, form submissions)
- API mocking and data fetching
- State management and stores
- i18n translations
- Theme switching

## Storybook

View and interact with components in isolation:

### Start Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

### Available Stories

- **Header**: Header component with theme and language switching
- **NumericBadge**: Badge component with various colors and values
- **Pagination**: Pagination component with page navigation
- **UI Components**: Links to shadcn documentation for Button, Dialog, Textarea, Alert, Tooltip components

### Build Storybook

```bash
npm run build-storybook
```

## Internationalization

The application supports multiple languages:

### Supported Languages

- **English** (en) - Default language
- **Arabic** (ar) - RTL support

### Adding Translations

Translations are located in `src/locales/`:

- `en.json` - English translations
- `ar.json` - Arabic translations

### Usage in Components

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('app.title')}</h1>;
}
```

## Dark Mode

Dark mode is implemented with:

- **Theme Toggle**: Button in header to switch themes
- **Persistent Storage**: Theme preference saved in localStorage
- **System Preference**: Detects system theme preference
- **Tailwind Classes**: Uses `dark:` prefix for dark mode styles

## Production Build

### Build Process

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## Contributing

### Development Guidelines

1. **Component Structure**
   - Use functional components with hooks
   - Include TypeScript types for all props
   - Use memo for performance optimization when needed

2. **Styling**
   - Use Tailwind CSS utility classes
   - Follow dark mode patterns with `dark:` prefix for component specific dark overrides
   - Maintain consistent spacing and colors

3. **Testing**
   - Write tests for all base components
   - Test user interactions and edge cases
   - Maintain 80%+ test coverage

4. **State Management**
   - Use Zustand for global state
   - Keep store actions pure and predictable
   - Use TypeScript interfaces for store types

### Code Style

- Follow React best practices
- Use TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Write self-documenting code with clear variable names

---

_For more information about the overall project structure and setup, see the [root README](../README.md)._
