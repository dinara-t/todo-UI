# Todos UI

A **React + TypeScript** frontend for the Spring Boot **Todos API**, built to demonstrate real-world CRUD workflows, filtering/sorting UX, and clean frontend architecture.

This project was developed as part of a structured learning journey to strengthen practical skills in **React state management**, **TypeScript correctness**, and **frontend–backend integration** (request shaping, error handling, and data-driven UI updates).

## What This UI Does

This UI integrates with the backend to provide:

- **Categories CRUD** (create, view, update, delete)
- **Todos CRUD** + **archive (soft delete)**
- **Toggle completed** directly from the list
- **Filter** todos by category
- **Sort** todos by `createdAt`, `title`, or `completed` with `ASC` / `DESC`

## Learning & Engineering Focus

This project was intentionally built to simulate a realistic production-style frontend working against a REST API. The focus was not just feature delivery, but engineering quality and technical growth.

Key areas of learning and improvement:

- Designing typed request/response layers between frontend and backend
- Preventing common integration bugs (e.g. malformed payloads, incorrect DTO mapping)
- Managing derived UI state without unnecessary re-renders
- Writing lint-clean, strictly typed React components
- Handling asynchronous workflows (loading, submitting, refreshing, error states)
- Structuring services and components with clear separation of responsibilities

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
