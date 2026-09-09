# Copilot Instructions

## General

### Never introduce a new dependency unless explicitly requested.

- Use React + TypeScript + Tailwind CSS.
- Prefer simple and maintainable code over clever abstractions.
- Keep files small and focused.
- Avoid unnecessary complexity, patterns, and premature optimization.
- Follow existing project structure and naming conventions.
- Use functional components only.

## UI Principles

This is an internal admin system, not a marketing website.

### Design Rules

- Minimalist and utilitarian design.
- Prioritize readability and efficiency.
- Use whitespace and typography instead of visual effects.
- Do not use animations unless explicitly requested.
- Do not use gradients.
- Do not use glassmorphism.
- Do not use shadows except when necessary.
- Do not use decorative illustrations.
- Do not use icon libraries unless explicitly requested.
- Do not use emojis.

### Colors

- Use a neutral color palette.
- Prefer white, gray, black, and subtle borders.
- Use color only to indicate status:
  - Success: green
  - Warning: yellow
  - Error: red
  - Info: blue

### Components

- Tables should be simple and easy to scan.
- Forms should be compact and aligned consistently.
- Buttons should be plain and clear.
- Modals should be simple and focused on one task.
- Avoid excessive spacing.

## Code Style

- Strong TypeScript typing.
- Avoid `any`.
- Prefer reusable components when duplication appears.
- Remove unused code immediately.
- Keep business logic outside UI components when possible.

## API Architecture

### API Layer

- All backend communication must go through files in `src/api`.
- Never call Axios directly inside React components.
- Never call Axios directly inside pages.
- Each business module should have its own API file.

Example:

```text
src/api/
├── auth.api.ts
├── product.api.ts
├── order.api.ts
└── customer.api.ts
```

### API Response

Backend responses follow:

```ts
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
```

- API functions should return `response.data.data`.
- UI components should not access nested response wrappers.

## Data Fetching

- Use React Query for all server state.
- Use Axios for API communication.
- Use `useQuery` for reads.
- Use `useMutation` for writes.
- Handle loading, empty, and error states explicitly.

### Query Keys

- Define reusable query keys in a central location.
- Do not hardcode query keys throughout the application.

Example:

```ts
export const QUERY_KEYS = {
  CURRENT_USER: ["current-user"],
  PRODUCTS: ["products"],
  ORDERS: ["orders"],
  CUSTOMERS: ["customers"],
};
```

## Authentication

Current implementation:

- Access token is stored in localStorage.
- Authorization header must be attached using Axios interceptors.
- User profile must be fetched from `/api/v1/auth/me`.
- User profile must be stored in React Query cache.

Future implementation:

- Authentication may migrate to HttpOnly Cookie.
- Avoid coupling business logic directly to localStorage.
- Access token management should be isolated behind a storage helper.

## State Management

Use React Query for:

- Current user
- Dashboard data
- Products
- Orders
- Customers
- All backend entities

Use Zustand only for:

- Sidebar state
- Theme
- UI preferences
- Other client-only state

Never store backend entities in Zustand.

## Feature Organization

Each feature should follow:

```text
features/
└── products/
    ├── ProductListPage.tsx
    ├── product.types.ts
    ├── useProducts.ts
    ├── useCreateProduct.ts
    ├── useUpdateProduct.ts
    └── useDeleteProduct.ts
```

API definitions remain in:

```text
api/
└── product.api.ts
```

## Routing

- Use React Router.
- Protect admin routes with authentication guards.

## Deliverables

When generating UI:

- Build complete working pages.
- Include loading states.
- Include empty states.
- Include validation messages.
- Keep layouts clean, simple, and practical.

Default choice: simple > fancy.

## Project Context

This application is an internal coffee shop management system.

Main modules:

- Authentication
- Dashboard
- Products
- Orders
- Customers
- Settings

Target users:

- Store owner
- Staff

This application should feel similar to traditional ERP, POS, inventory management, or accounting software rather than a modern marketing website.