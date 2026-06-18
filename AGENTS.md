# AGENTS.md

## Project Overview

BetterTimer is a web-based timer application for running a single timer or a sequence of timers in succession. The primary use case is workout routines (e.g. stretching sequences) where multiple exercises run back-to-back with different durations.

## Tech Stack

| Layer     | Technology                                                                 |
| --------- | -------------------------------------------------------------------------- |
| Frontend  | React 19, TypeScript, Vite 7, MUI 7 (Material UI), Axios, use-sound      |
| Backend   | Node 20, Express 5, TypeScript, Drizzle ORM                               |
| Database  | MySQL 8.0                                                                  |
| Infra     | Docker Compose (MySQL + backend containers; frontend runs on host)         |
| Testing   | Vitest, React Testing Library, jsdom                                       |
| Linting   | ESLint (typescript-eslint + react-hooks + react-refresh + Prettier plugin) |
| Formatter | Prettier (single quotes, semicolons, trailing commas, 100 print width)    |

## Repository Structure

```
BetterTimer/
├── docker-compose.yml          # MySQL + backend containers
├── package.json                # Root devDependencies (Prettier, ESLint config)
├── frontend/
│   ├── package.json
│   ├── vite.config.ts          # Vite + Vitest config
│   ├── eslint.config.js        # Flat ESLint config with Prettier integration
│   ├── index.html
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── src/
│       ├── main.tsx            # App entrypoint
│       ├── App.tsx             # Root component (theme + view state)
│       ├── constants.ts        # Shared types (Clock, Timer, ClocksMap, views)
│       ├── theme.ts            # MUI themes: Nordic, Desert, Midnight
│       ├── index.css
│       ├── api/
│       │   └── apiClient.ts    # Axios instance → http://localhost:5000/api
│       ├── helpers/
│       │   └── formatTime.ts   # HH:MM:SS formatter
│       ├── styles/
│       │   └── styles.ts       # Shared styled components
│       ├── assets/
│       │   └── beep1.mp3       # Audio played on timer completion
│       └── components/
│           ├── global/         # GlobalHeader, PageManager, ThemeSelector, TimerSelector
│           ├── create/         # CreateTimer (stub)
│           └── active/         # ActiveTimer, ActiveTimerBody, ActiveTimerHeader
│               └── blocks/     # CurrentTimerBlock, NextTimerBlock, UpcomingTimerBlock(s)
│                   └── clocks/ # CurrentClock (live countdown), StaticClock (display only)
├── backend/
│   ├── package.json
│   ├── Dockerfile              # Node 20 Alpine, builds TS → runs dist/index.js
│   ├── tsconfig.json
│   ├── drizzle.config.ts       # Drizzle Kit config (reads DB creds from env)
│   ├── database.json           # Legacy db-migrate config (not actively used)
│   ├── src/
│   │   ├── index.ts            # Express server on port 5000, mysql2 pool + Drizzle
│   │   ├── db/
│   │   │   └── schema.ts       # Drizzle schema: clocks, timers, timer_clock_sequence
│   │   └── routes/
│   │       └── timerRoutes.ts  # GET /api/timers, GET /api/timers/:id
│   ├── migrations/             # Drizzle Kit SQL migrations
│   └── seeds/
│       └── seed_initial_stretches.sql  # Sample data (leg + upper body routines)
```

## Architecture

### Data Model

- **timers** — a named collection (e.g. "Leg Flexibility Routine")
- **clocks** — a named interval with a duration in seconds
- **timer_clock_sequence** — join table linking clocks to timers with a position for ordering

### Frontend Component Hierarchy

```
App
├── GlobalHeader
│   ├── ThemeSelector        # Switch between Nordic / Desert / Midnight themes
│   └── TimerSelector        # Dropdown to pick a saved timer routine
├── PageManager
│   ├── CreateTimer          # Placeholder for timer creation (not yet implemented)
│   └── ActiveTimer
│       ├── ActiveTimerHeader
│       └── ActiveTimerBody
│           ├── CurrentTimerBlock → CurrentClock  (live countdown with progress bar)
│           ├── NextTimerBlock    → StaticClock   (preview of next clock)
│           ├── Start/Pause Button (spacebar shortcut)
│           └── UpcomingTimersBlock → UpcomingTimerBlock[] → StaticClock[]
```

### Backend API

| Method | Endpoint           | Description                                      |
| ------ | ------------------ | ------------------------------------------------ |
| GET    | `/api/timers`      | Returns all timers (id, title, userId)            |
| GET    | `/api/timers/:id`  | Returns a timer with its ordered clocks           |

## Coding Conventions

- **TypeScript everywhere** — both frontend and backend are written in TypeScript.
- **Formatting** — Prettier with single quotes, semicolons, ES5 trailing commas, 100 char print width. Enforced via ESLint Prettier plugin.
- **Component styles** — defined as `const styles = { ... }` objects at the bottom of each component file, using MUI's `sx` prop with `(theme: Theme) => ({})` callbacks for theme access.
- **Exports** — components use default exports. Types and constants use named exports from `constants.ts`.
- **State management** — React `useState` and `useEffect` hooks. No external state library.
- **API client** — centralized Axios instance in `frontend/src/api/apiClient.ts`.
- **Timer data** — currently hardcoded in `ActiveTimer.tsx` via a `timersMap` object. The backend API exists but is not yet fully wired into the frontend.
- **Themes** — three MUI themes (Nordic, Desert, Midnight) defined in `theme.ts` with custom palette extensions (`background.muted`, `background.highlight`, `header.*`).
- **Module system** — frontend uses ESM (`"type": "module"`), backend uses CommonJS (`"type": "commonjs"`).

## Development Commands

### Frontend (from `frontend/`)

```bash
npm run dev         # Start Vite dev server (port 5173)
npm run build       # TypeScript check + Vite production build
npm run lint        # Run ESLint
npm run test        # Run Vitest in watch mode
npm run coverage    # Run Vitest with coverage
```

### Backend (from `backend/`)

```bash
npm run dev         # Start with nodemon + ts-node (watches src/)
npm run build       # Compile TypeScript → dist/
npm run start       # Run compiled JS (dist/index.js)
npm run db:generate # Generate Drizzle migrations from schema
npm run db:migrate  # Apply Drizzle migrations to DB
npm run db:seed     # Seed sample data via Docker exec into MySQL
```

### Docker

```bash
docker compose up -d    # Start MySQL (port 3306) + backend (port 5001→5000)
docker compose down     # Stop and remove containers
```

## Environment Variables

### Backend

| Variable      | Description              | Default (docker-compose) |
| ------------- | ------------------------ | ------------------------ |
| `DB_HOST`     | MySQL host               | `db`                     |
| `DB_USER`     | MySQL user               | `root`                   |
| `DB_PASSWORD` | MySQL password           | `password`               |
| `DB_DATABASE` | MySQL database name      | `better_timer_db`        |

## Testing

- Tests use **Vitest** with **jsdom** environment and **React Testing Library**.
- Test files are co-located with source: `*.test.tsx` next to the component.
- Setup file: `frontend/src/setupTests.ts` (imports `@testing-library/jest-dom`).
- Run with `npm run test` from `frontend/`.

## Notes for AI Agents

- The `CreateTimer` component is a stub — timer creation is not yet implemented.
- Timer data in the frontend is currently hardcoded. The backend API exists and serves data, but the frontend `TimerSelector` has hardcoded menu items rather than fetching from the API dynamically.
- The backend `timerRoutes` are defined but not mounted in `index.ts` — the router import and `app.use('/api/timers', timerRoutes)` call is missing.
- No CORS middleware is configured on the backend. This will need to be added for frontend-backend communication.
- The `database.json` file appears to be a leftover from an earlier db-migrate setup; Drizzle Kit is the active migration tool.
- Audio (beep) plays via the `use-sound` hook when a timer completes.
- Spacebar toggles pause/start globally (unless user is typing in an input).
