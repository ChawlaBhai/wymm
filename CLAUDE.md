# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Frontend (Vite + React)
All commands should be run from the `frontend/` directory.

- **Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Linting**: `npm run lint`
- **Preview Production Build**: `npm run preview`

## Project Architecture

The project is a web application built with React, Vite, and TypeScript, utilizing Supabase for backend services (Auth, Database, Storage).

### Directory Structure
- `frontend/src/components/`: Reusable UI components.
- `frontend/src/pages/`: Page-level components representing different routes.
- `frontend/src/store/`: State management using Zustand (e.g., `authStore.ts`).
- `frontend/src/lib/`: Core logic, including Supabase client and authentication helpers.
- `frontend/src/hooks/`: Custom React hooks.
- `frontend/src/types/`: TypeScript type definitions.

### Key Technologies
- **Framework**: React 19 with Vite
- **Routing**: `react-router-dom`
- **State Management**: `zustand`
- **Styling**: Tailwind CSS 4
- **Backend/Auth**: Supabase
- **Forms**: `react-hook-form` with `zod` validation
- **Animations**: `framer-motion`

### Core Logic Flow
1. **Authentication**: Managed via `useAuthStore` (Zustand) which synchronizes with Supabase's auth state via `onAuthChange` in `lib/auth.ts`.
2. **Routing**: Defined in `App.tsx` using lazy-loaded routes for performance.
3. **Data Persistence**: Primarily handled through Supabase client in `lib/supabase.ts`.
