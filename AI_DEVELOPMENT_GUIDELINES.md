# AI Development Guidelines for the Easytax Frontend Project

This document provides a set of rules and best practices for AI-assisted development on this project. The goal is to ensure code quality, consistency, maintainability, and performance. All generated code must adhere to these guidelines.

## 1. Core Principles

- **Adhere to Existing Conventions**: Before writing any code, analyze the existing codebase (`src/` directory) to understand and replicate its patterns, naming conventions, and file structures.
- **Quality and Simplicity**: Prioritize clean, readable, and simple code. Avoid over-engineering.
- **Performance First**: Leverage Next.js and React features to build a fast and responsive application.

## 2. TypeScript: Strictness and Clarity

- **Strict Mode is Mandatory**: The project uses `strict: true` in `tsconfig.json`. The use of `any` is strictly forbidden unless there is a well-justified reason.
- **Explicit Typing**: While type inference is useful, be explicit with types for all function parameters, return values, and state definitions.
- **Centralized Types**: Define shared types and interfaces in the `src/types` directory. For API responses, create types that match the data structure precisely.
- **Props Typing**: All component props must be typed using an `interface` or `type` definition.

```typescript
// Good example
interface UserProfileProps {
  userId: string;
  onUpdate: (data: UserData) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, onUpdate }) => {
  // ...
};
```

## 3. Component Architecture

- **Reusability is Key**: Decompose UI into small, single-purpose, reusable components.
- **Atomic Structure**: Follow a quasi-atomic design structure:
    - `src/components/ui`: Basic building blocks (atoms) like `Button`, `Input`, `Card`. These should be highly reusable and contain no business logic.
    - `src/components/composed`: More complex components (molecules/organisms) that combine UI components.
    - `src/components/features`: Components tied to specific business logic or features.
- **Separation of Concerns**:
    - **Logic in Hooks**: Encapsulate business logic, state management, and side effects within custom hooks (`src/hooks`).
    - **UI in Components**: Components should focus primarily on rendering JSX based on props and state.

## 4. State Management & Data Fetching (React Query)

-**if you can't connect it to the backend, use structured mock data for development**

- **React Query for Server State**: **All** interactions with the server (fetching, caching, updating data) **must** be handled by TanStack Query (React Query).
- **Strict Query Keys**: Use structured, serializable query keys to manage cache effectively. A good pattern is `['entity', 'list', { filters }]` or `['entity', 'detail', id]`.
    ```typescript
    // Good example
    const useUsers = (filters: UserFilters) => {
      return useQuery({
        queryKey: ['users', 'list', filters],
        queryFn: () => api.fetchUsers(filters),
      });
    };
    ```
- **Mutations for Data Changes**: Use `useMutation` for all `POST`, `PUT`, `PATCH`, and `DELETE` operations. On success, invalidate the relevant queries to refetch stale data.
- **Client State**:
    - For simple, local state, use `useState` or `useReducer`.
    - For complex global state that needs to be shared across the app, use Zustand (preferred) or React Context. Avoid prop drilling.

## 5. Next.js 15.3+ Modern Best Practices

- **Data Fetching in RSCs**: Fetch data directly in Server Components using `async/await`. This is the primary data-fetching method for initial page loads.
    ```typescript
    // Good example: app/users/[id]/page.tsx
    async function UserProfilePage({ params }: { params: { id: string } }) {
      const user = await api.fetchUserById(params.id); // Direct data fetching
      return <UserProfile user={user} />;
    }
    ```
- **Server Actions for Mutations**: Use Server Actions for form submissions and data mutations. This reduces client-side JavaScript and simplifies the client-server boundary. Combine them with `useTransition` on the client for pending states.
- **Caching and Revalidation**:
    - Leverage Next.js's built-in data caching.
    - Use `revalidatePath` or `revalidateTag` within Server Actions or Route Handlers to invalidate cached data and trigger re-renders.
- **Partial Prerendering (PPR)**: Design components with PPR in mind. The page shell should be static and prerendered, with dynamic parts wrapped in `<Suspense>` to be streamed in. This is a key performance feature of modern Next.js.

## 6. Code Quality and Formatting

- **ESLint and Prettier**: All code must be free of ESLint errors and warnings. Code must be formatted with Prettier before committing.
- **Naming Conventions**:
    - **Components & Types**: `PascalCase` (e.g., `UserProfile`, `IUserProps`).
    - **Variables, Functions, Hooks**: `camelCase` (e.g., `userData`, `fetchUsers`, `useUserData`).
    - **Custom Hooks**: Must start with `use` (e.g., `useAuth`).
- **Imports**: Use absolute imports (`@/components/...`) instead of relative imports (`../../components/...`).
