# WakeCap Frontend TODO Application

A modern, feature-rich TODO application built with React, TypeScript, and Vite. This monorepo includes a complete frontend application with a json-server backend for data persistence.

## Features

- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete)
- **Pagination**: Efficient pagination for handling large task lists
- **Task Tracking**: Real-time counters for completed, uncompleted, and deleted tasks
- **Dark Mode**: Toggle between light and dark themes
- **Internationalization**: Support for English and Arabic with RTL support
- **Component Library**: Storybook integration for component documentation
- **Comprehensive Testing**: Vitest test suite with coverage reporting

## Architecture

This is a **monorepo** workspace containing:

### Frontend

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **i18next** - Internationalization
- **Zod** - Schema validation
- **Chadcn** - UI Component Library
- **Vitest** - Testing framework
- **Storybook** - Component documentation

### Backend

- **json-server** - Mock REST API for development

For detailed API usage examples, see the `postman_collection.json` file.

## Project Structure

```
frontend-todo/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components (shared + ui)
│   │   ├── features/      # Feature-based modules
│   │   │   └── tasks/     # Task management feature
│   │   ├── lib/           # Shared utilities and HTTP client
│   │   ├── stores/        # Zustand state stores
│   │   ├── locales/       # i18n translation files
│   │   └── types/         # TypeScript definitions
│   └── package.json
├── api/                   # json-server backend
│   ├── db.json            # JSON database
│   └── server.js          # json-server configuration
└── package.json           # Root workspace configuration
```

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

```bash
npm run install:all
```

### Development

Start both frontend and backend servers:

```bash
npm run dev
```

This will start:

- Backend API server on `http://localhost:3001`
- Frontend development server on `http://localhost:5173`

### Available Scripts

| Command                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `npm run dev`             | Start both frontend and backend in development mode |
| `npm run dev:frontend`    | Start only the frontend development server          |
| `npm run dev:api`         | Start only the backend server                       |
| `npm run build`           | Build the frontend for production                   |
| `npm run preview`         | Preview frontend production build                   |
| `npm run test`            | Run all tests                                       |
| `npm run test:watch`      | Run tests in watch mode                             |
| `npm run test:coverage`   | Run tests with coverage report                      |
| `npm run storybook`       | Start Storybook development server                  |
| `npm run build-storybook` | Build Storybook for production                      |
| `npm run clean`           | Clean all node_modules and build artifacts          |

## Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Storybook

View and interact with components in isolation:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```
