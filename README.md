# Todos UI

A **React + TypeScript** frontend for the Spring Boot **Todos API**, built to demonstrate real-world CRUD workflows, filtering/sorting UX, and clean frontend architecture.

This project was developed as part of a structured learning journey to strengthen practical skills in React state management, TypeScript correctness, frontend–backend integration, and component-level testing.

## What This UI Does

This UI integrates with the backend to provide:

- **Categories CRUD** (create, view, update, delete)
- **Todos CRUD** + **archive (soft delete)**
- **Toggle completed** directly from the list
- **Filter** todos by category
- **Sort** todos by `createdAt`, `title`, or `completed` with `ASC` / `DESC`
- Modal-based create/edit workflows
- Form validation with clear user feedback

## Testing

This project includes unit and component tests using Vitest and React Testing Library.

The test suite focuses on:

- Component rendering behaviour
- User interaction flows (click, change, submit)
- Form validation logic
- Correct data payloads passed to handlers
- Conditional rendering and UI state

Examples of tested behaviours:

- Buttons trigger correct callbacks
- Forms validate and submit trimmed data
- Filters update sort/category state correctly
- Todo items call toggle/edit/archive handlers
- Modal visibility logic behaves correctly

## Learning & Engineering Focus

This project was intentionally built to simulate a realistic production-style frontend working against a REST API. The focus was not just feature delivery, but engineering quality and technical growth.

Key areas of learning and improvement:

- Designing typed request/response layers between frontend and backend
- Preventing common integration bugs (e.g. malformed payloads, incorrect DTO mapping)
- Managing derived UI state without unnecessary re-renders
- Writing lint-clean, strictly typed React components
- Handling asynchronous workflows (loading, submitting, refreshing, error states)
- Structuring services and components with clear separation of responsibilities
- Writing meaningful unit tests for UI behaviour instead of snapshot-only testing

## Tech Stack

- React (Vite)
- TypeScript
- React Router
- Tailwind CSS
- Vitest + Testing Library
- ESLint

## Setup

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Run tests

```bash
npm run test
```
