# AGENTS.md

## Project Overview

BetterTimer is a web-based timer application for running a single timer or a sequence of timers in succession. The primary use case is workout routines (e.g. stretching sequences, strength circuits, HIIT) where multiple exercises run back-to-back. Clocks can be **timed** (countdown) or **rep-based** (user clicks NEXT), support multiple **sets**, and have configurable **rest periods** between sets.

## Tech Stack

| Layer     | Technology                                                                 |
| --------- | -------------------------------------------------------------------------- |
| Frontend  | React 19, TypeScript, Vite 7, MUI 7 (Material UI), Axios, use-sound      |
| Backend   | Node 20, Express 5, TypeScript, Drizzle ORM                               |
| Database  | MySQL 8.0                                                                  |
| Infra     | Docker Compose (MySQL + backend containers; frontend runs on host)         |
| Testing   | Vitest, React Testing Library, jsdom (frontend); Vitest, Supertest (backend) |
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
│   ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
│   └── src/
│       ├── main.tsx            # App entrypoint
│       ├── App.tsx             # Root component (theme + view state)
│       ├── constants.ts        # Shared types (Clock, Timer, ClockType, TimerPageView)
│       ├── theme.ts            # MUI themes: Nordic, Desert, Midnight
│       ├── index.css
│       ├── api/
│       │   └── apiClient.ts    # Axios instance -> http://localhost:5000/api
│       ├── helpers/
│       │   └── formatTime.ts   # HH:MM:SS formatter
│       ├── styles/
│       │   └── styles.ts       # Shared styled components
│       ├── assets/
│       │   └── beep1.mp3       # Audio played on timer events
│       └── components/
│           ├── global/         # GlobalHeader, PageManager, ThemeSelector, TimerSelector
│           ├── create/         # CreateTimer (form: type toggle, reps, sets, rest)
│           └── active/         # ActiveTimer, ActiveTimerBody, ActiveTimerHeader
│               └── blocks/     # CurrentTimerBlock, NextTimerBlock, UpcomingTimerBlock(s)
│                   ├── RepCounter.tsx        # Rep count display + NEXT button
│                   └── clocks/ # CurrentClock (live countdown), StaticClock (display only)
├── backend/
│   ├── package.json
│   ├── Dockerfile              # Node 20 Alpine, builds TS -> runs dist/index.js
│   ├── tsconfig.json
│   ├── vitest.config.ts        # Backend test config
│   ├── drizzle.config.ts       # Drizzle Kit config (reads DB creds from env)
│   ├── src/
│   │   ├── index.ts            # Server entry: auto-migration with retry logic, starts Express
│   │   ├── app.ts              # Express app setup (CORS, JSON parsing, route mounting)
│   │   ├── db/
│   │   │   ├── schema.ts       # Drizzle schema: clocks, timers, timer_clock_sequence
│   │   │   └── connection.ts   # MySQL connection pool (mysql2 + Drizzle)
│   │   ├── routes/
│   │   │   ├── timerRoutes.ts  # GET /api/timers, GET /api/timers/:id, POST /api/timers
│   │   │   └── timerRoutes.test.ts  # Backend route tests (Vitest + Supertest)
│   │   └── seed.ts             # TypeScript seed script (4 sample routines)
│   └── migrations/             # Drizzle Kit SQL migrations (auto-applied on startup)
```

## Architecture

### Data Model

- **timers** — a named collection (e.g. "Strength Circuit")
- **clocks** — a named exercise with the following fields:
  - `type` — `'timed'` (countdown) or `'reps'` (user-driven)
  - `duration` — seconds for timed clocks (0 for reps)
  - `reps` — rep count for rep-based clocks (null for timed)
  - `sets` — number of times to repeat (default 1)
  - `restBetweenSets` — seconds of rest between sets (default 0)
- **timer_clock_sequence** — join table linking clocks to timers with a `position` for ordering

### Frontend Component Hierarchy

```
App
├── GlobalHeader
│   ├── ThemeSelector            # Switch between Nordic / Desert / Midnight themes
│   └── TimerSelector            # Dropdown fetches timer list from API on open
├── PageManager
│   ├── CreateTimer              # Form: title, clock rows (name, type toggle, duration/reps, sets, rest)
│   └── ActiveTimer
│       ├── ActiveTimerHeader
│       └── ActiveTimerBody
│           ├── CurrentTimerBlock
│           │   ├── CurrentClock   (timed: live countdown with progress bar)
│           │   └── RepCounter     (reps: rep count display + NEXT button)
│           │   └── Set tracking   ("Set X of Y" indicator)
│           │   └── Rest countdown (between sets, with "Skip Rest" button)
│           ├── NextTimerBlock → StaticClock (preview of next clock, shows reps/sets)
│           ├── Overall workout stopwatch ("Total: HH:MM:SS")
│           ├── Start/Pause Button (spacebar shortcut, disabled when timers complete)
│           └── UpcomingTimersBlock → UpcomingTimerBlock[] → StaticClock[]
```

### Backend API

| Method | Endpoint           | Description                                      |
| ------ | ------------------ | ------------------------------------------------ |
| GET    | `/api/timers`      | Returns all timers (id, title, userId)            |
| GET    | `/api/timers/:id`  | Returns a timer with its ordered clocks (includes type, reps, sets, restBetweenSets) |
| POST   | `/api/timers`      | Creates a new timer with clocks. Body: `{ title, clocks: [{ name, type, duration, reps, sets, restBetweenSets }] }` |

### Backend Startup

The backend (`index.ts`) automatically runs Drizzle migrations on startup with retry logic (up to 10 attempts, 3s delay) to handle MySQL not being ready yet. No manual migration step is needed.

## Coding Conventions

- **TypeScript everywhere** — both frontend and backend are written in TypeScript.
- **Formatting** — Prettier with single quotes, semicolons, ES5 trailing commas, 100 char print width. Enforced via ESLint Prettier plugin.
- **Component styles** — defined as `const styles = { ... }` objects at the bottom of each component file, using MUI's `sx` prop with `(theme: Theme) => ({})` callbacks for theme access.
- **Exports** — components use default exports. Types and constants use named exports from `constants.ts`.
- **State management** — React `useState` and `useEffect` hooks. No external state library.
- **React 19 Strict Mode** — cannot call `setState` synchronously within effect body. Derive computed values instead (e.g. `isRunning = !isPaused && !timersComplete`, then use in dependency array).
- **API client** — centralized Axios instance in `frontend/src/api/apiClient.ts` pointing to `http://localhost:5000/api`.
- **Themes** — three MUI themes (Nordic, Desert, Midnight) defined in `theme.ts` with custom palette extensions (`background.muted`, `background.highlight`, `header.*`).
- **Module system** — frontend uses ESM (`"type": "module"`), backend uses CommonJS (`"type": "commonjs"`).
- **Audio** — beep plays via the `use-sound` hook on timer completion, rest start, rest end, and set completion.
- **Clock types** — `CLOCK_TYPE.TIMED` and `CLOCK_TYPE.REPS` enum in `constants.ts`.

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
npm run build       # Compile TypeScript -> dist/
npm run start       # Run compiled JS (dist/index.js)
npm run db:generate # Generate Drizzle migrations from schema
npm run db:migrate  # Apply Drizzle migrations to DB
npm run db:seed     # Seed sample data (4 routines with timed + rep-based clocks)
npm run test        # Run backend tests (Vitest + Supertest)
```

### Docker

```bash
docker compose up -d    # Start MySQL (port 3306) + backend (port 5000)
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

- **Frontend:** 90 tests using Vitest + React Testing Library (jsdom). Test files co-located: `*.test.tsx` next to the component.
- **Backend:** 16 tests using Vitest + Supertest. Tests in `timerRoutes.test.ts`.
- Setup file: `frontend/src/setupTests.ts` (imports `@testing-library/jest-dom`).
- Run frontend tests: `npm run test` from `frontend/`.
- Run backend tests: `npm run test` from `backend/`.

## Notes for AI Agents

- The `CreateTimer` component is fully functional — users can create timers with timed/rep clocks, sets, and rest between sets.
- Timer data is fetched from the backend API. `TimerSelector` fetches the list on dropdown open.
- CORS is configured in `app.ts`. Routes are mounted at `/api/timers`.
- Migrations run automatically on backend startup — no manual migration step needed.
- The `database.json` file is a leftover from an earlier db-migrate setup; Drizzle Kit is the active migration tool.
- Spacebar toggles pause/start globally (unless user is typing in an input).
- When modifying set/rest logic in `CurrentTimerBlock`, be aware of React 19 strict mode constraints: derive computed state instead of calling `setState` in effects.
