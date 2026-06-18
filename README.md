# BetterTimer

A web-based timer app for running a single timer or a sequence of timers in succession. Built for workout routines where multiple exercises run back-to-back with different durations (e.g. stretching sequences).

## Features

- Run ordered sequences of named timers with individual durations
- Live countdown with progress bar for the current timer
- Preview of the next and upcoming timers in the queue
- Skip the current timer or pause/resume with spacebar
- Audio beep notification when each timer completes
- Three color themes: Nordic, Desert, and Midnight
- Select from saved timer routines via dropdown

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite + Material UI (MUI 7)
- **Backend:** Node.js + Express 5 + TypeScript + Drizzle ORM
- **Database:** MySQL 8.0
- **Infrastructure:** Docker Compose

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

### 3. Run database migrations and seed data

Once the containers are running, install backend dependencies, apply the Drizzle migrations, and seed the sample timer routines:

```bash
cd backend
npm install
DB_HOST=localhost DB_USER=root DB_PASSWORD=password DB_DATABASE=better_timer_db npm run db:migrate
npm run db:seed
cd ..
```

The seed script (`npm run db:seed`) inserts two sample routines:
- **Leg Flexibility Routine** — 11 stretches (splits, calves, quads, hamstrings, etc.)
- **Upper Body Flexibility Routine** — 9 stretches (chest, triceps, cat, downward dog, etc.)

> **Note:** `db:migrate` and `db:seed` require the database environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_DATABASE`). The defaults in the seed script point to `localhost`, so the above works when MySQL is running via Docker Compose. You can also seed via raw SQL with `npm run db:seed:sql` (requires the Docker container to be running).

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts at **http://localhost:5173**.

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

### Docker

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `docker compose up -d` | Start MySQL + backend containers         |
| `docker compose down`  | Stop and remove containers               |

## Environment Variables

### Backend

| Variable      | Description         | Default              |
| ------------- | ------------------- | -------------------- |
| `DB_HOST`     | MySQL host          | `db` (Docker) / `localhost` (seed) |
| `DB_USER`     | MySQL user          | `root`               |
| `DB_PASSWORD` | MySQL password      | `password`           |
| `DB_DATABASE` | Database name       | `better_timer_db`    |

### Frontend

| Variable       | Description               | Default                        |
| -------------- | ------------------------- | ------------------------------ |
| `VITE_API_URL` | Backend API base URL      | `http://localhost:5000/api`    |

## Project Structure

```
BetterTimer/
├── docker-compose.yml
├── package.json              # Root (Prettier + ESLint config deps)
├── frontend/                 # React + Vite app
│   ├── src/
│   │   ├── components/       # UI components (global, active, create)
│   │   ├── api/              # Axios API client
│   │   ├── helpers/          # Utility functions
│   │   ├── styles/           # Shared styled components
│   │   └── assets/           # Audio files, images
│   └── ...
├── backend/                  # Express API server
│   ├── src/
│   │   ├── db/               # Drizzle schema
│   │   ├── routes/           # API route handlers
│   │   └── seed.ts           # TypeScript seed script
│   ├── migrations/           # Drizzle SQL migrations
│   └── seeds/                # SQL seed files (legacy)
```
