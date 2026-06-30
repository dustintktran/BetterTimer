# BetterTimer

A web-based timer app for running a single timer or a sequence of timers in succession. Built for workout routines where multiple exercises run back-to-back with different durations (e.g. stretching sequences, strength circuits, HIIT).

## Features

- **Timed clocks** — countdown timers with a live progress bar
- **Rep-based clocks** — display a rep count with a NEXT button (no countdown)
- **Multi-set support** — clocks can repeat for multiple sets with a "Set X of Y" indicator
- **Rest between sets** — configurable rest countdown between each set
- **Create timer** — build custom routines with a form (name, type, duration/reps, sets, rest)
- **Overall workout timer** — elapsed stopwatch showing total workout time
- **Skip controls** — skip the current clock or skip just the rest period
- **Pause/resume** — spacebar shortcut to toggle pause
- **Audio notifications** — beep on timer completion, rest start, and rest end
- **Three color themes** — Nordic, Desert, and Midnight
- **Select saved routines** — dropdown fetches timer list from the API

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite 7 + Material UI (MUI 7)
- **Backend:** Node.js 20 + Express 5 + TypeScript + Drizzle ORM
- **Database:** MySQL 8.0
- **Infrastructure:** Docker Compose (MySQL + backend containers; frontend runs on host)
- **Testing:** Vitest + React Testing Library (frontend), Vitest + Supertest (backend)

## Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Docker](https://www.docker.com/) and Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dustintktran/BetterTimer.git
cd BetterTimer
```

### 2. Start the database and backend with Docker

```bash
docker compose up -d
```

This starts:
- **MySQL** on port `3306`
- **Backend API** on port `5000`

The backend automatically runs Drizzle migrations on startup (with retry logic for MySQL readiness), so the database schema is created automatically.

### 3. Seed sample data

Once the containers are running:

```bash
cd backend
npm install
DB_HOST=localhost npm run db:seed
cd ..
```

The seed script inserts four sample routines:
- **Leg Flexibility Routine** — 11 timed stretches (splits, calves, quads, hamstrings, etc.)
- **Upper Body Flexibility Routine** — 9 timed stretches (chest, triceps, cat, downward dog, etc.)
- **Strength Circuit** — mixed rep/timed exercises with multi-set support (Push-ups 15x3, Squats 20x3, Lunges 12x2, Plank 60sx3)
- **Full Body HIIT** — rep-based exercises with rest between sets (Burpees 10x3, Jump Squats 15x3, Mountain Climbers 20x2, etc.)

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts at **http://localhost:5173**.

### Running backend locally (without Docker for backend)

If you want to run only MySQL in Docker and the backend locally:

```bash
# Start just the database container
docker compose up -d db

# Run the backend locally
cd backend
DB_HOST=localhost npm run dev
```

## API Endpoints

### `GET /api/timers`

Returns all saved timers.

**Response:**
```json
[
  { "id": "uuid", "title": "Leg Flexibility Routine", "userId": 1 }
]
```

### `GET /api/timers/:id`

Returns a timer with its ordered clocks.

**Response:**
```json
{
  "id": "uuid",
  "title": "Strength Circuit",
  "clocks": [
    {
      "id": "uuid",
      "name": "Push-ups",
      "duration": 0,
      "type": "reps",
      "reps": 15,
      "sets": 3,
      "restBetweenSets": 30,
      "position": 1
    },
    {
      "id": "uuid",
      "name": "Plank",
      "duration": 60,
      "type": "timed",
      "reps": null,
      "sets": 3,
      "restBetweenSets": 15,
      "position": 2
    }
  ]
}
```

### `POST /api/timers`

Creates a new timer with clocks.

**Request body:**
```json
{
  "title": "My Workout",
  "clocks": [
    { "name": "Push-ups", "type": "reps", "duration": 0, "reps": 15, "sets": 3, "restBetweenSets": 30 },
    { "name": "Plank", "type": "timed", "duration": 60, "sets": 2, "restBetweenSets": 15 }
  ]
}
```

**Response:** `201 Created` with the created timer and clocks.

## Development

### Frontend (from `frontend/`)

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start Vite dev server (port 5173)    |
| `npm run build`     | TypeScript check + production build  |
| `npm run lint`      | Run ESLint                           |
| `npm run test`      | Run Vitest in watch mode             |
| `npm run coverage`  | Run Vitest with coverage report      |

### Backend (from `backend/`)

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `npm run dev`         | Start with nodemon (auto-restarts on changes)|
| `npm run build`       | Compile TypeScript to `dist/`                |
| `npm run start`       | Run the compiled server (`dist/index.js`)    |
| `npm run db:generate` | Generate Drizzle migrations from schema      |
| `npm run db:migrate`  | Apply Drizzle migrations                     |
| `npm run db:seed`     | Seed sample routines via TypeScript + Drizzle |
| `npm run db:seed:sql` | Seed via raw SQL through Docker exec          |
| `npm run test`        | Run backend tests with Vitest                |

### Docker

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `docker compose up -d` | Start MySQL + backend containers         |
| `docker compose down`  | Stop and remove containers               |

## Environment Variables

### Backend

| Variable      | Description         | Default              |
| ------------- | ------------------- | -------------------- |
| `DB_HOST`     | MySQL host          | `db` (Docker) / `localhost` (local) |
| `DB_USER`     | MySQL user          | `root`               |
| `DB_PASSWORD` | MySQL password      | `password`           |
| `DB_DATABASE` | Database name       | `better_timer_db`    |

## Testing

- **Frontend:** 90 tests using Vitest + React Testing Library (jsdom). Run with `npm run test` from `frontend/`.
- **Backend:** 16 tests using Vitest + Supertest. Run with `npm run test` from `backend/`.
- Test files are co-located with source: `*.test.tsx` / `*.test.ts` next to the component or route.

## Project Structure

```
BetterTimer/
├── docker-compose.yml
├── package.json                 # Root (Prettier + ESLint config deps)
├── frontend/                    # React + Vite app
│   ├── src/
│   │   ├── App.tsx              # Root component (theme + view state)
│   │   ├── constants.ts         # Shared types (Clock, Timer, ClockType)
│   │   ├── theme.ts             # MUI themes: Nordic, Desert, Midnight
│   │   ├── api/
│   │   │   └── apiClient.ts     # Axios instance -> http://localhost:5000/api
│   │   ├── helpers/
│   │   │   └── formatTime.ts    # HH:MM:SS formatter
│   │   ├── assets/
│   │   │   └── beep1.mp3        # Audio played on timer events
│   │   └── components/
│   │       ├── global/          # GlobalHeader, PageManager, ThemeSelector, TimerSelector
│   │       ├── create/          # CreateTimer (form with type toggle, reps, sets, rest)
│   │       └── active/          # ActiveTimer, ActiveTimerBody, ActiveTimerHeader
│   │           └── blocks/      # CurrentTimerBlock, NextTimerBlock, UpcomingTimerBlock(s)
│   │               ├── RepCounter.tsx        # Rep display + NEXT button
│   │               └── clocks/              # CurrentClock (countdown), StaticClock (preview)
│   └── ...
├── backend/                     # Express API server
│   ├── src/
│   │   ├── index.ts             # Server entry, auto-migration with retry logic
│   │   ├── app.ts               # Express app setup (CORS, routes)
│   │   ├── db/
│   │   │   ├── schema.ts        # Drizzle schema: clocks, timers, timer_clock_sequence
│   │   │   └── connection.ts    # MySQL connection pool
│   │   ├── routes/
│   │   │   └── timerRoutes.ts   # GET /api/timers, GET /api/timers/:id, POST /api/timers
│   │   └── seed.ts              # TypeScript seed script
│   └── migrations/              # Drizzle SQL migrations
```
