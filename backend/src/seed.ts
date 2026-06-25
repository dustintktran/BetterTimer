import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { timers, clocks, timerClockSequence } from './db/schema';
import { sql } from 'drizzle-orm';

const LEG_TIMER_ID = 'b1a2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';
const UPPER_TIMER_ID = 'u1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d';
const STRENGTH_TIMER_ID = 's1a2b3c4-d5e6-4f7a-8b9c-0d1e2f3a4b5c';

const timerRows = [
  { id: LEG_TIMER_ID, userId: 1, title: 'Leg Flexibility Routine' },
  { id: UPPER_TIMER_ID, userId: 1, title: 'Upper Body Flexibility Routine' },
  { id: STRENGTH_TIMER_ID, userId: 1, title: 'Strength Circuit' },
];

const clockRows = [
  { id: 'c001-uuid', userId: 1, name: 'Split Stretch', duration: 120, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c002-uuid', userId: 1, name: 'Calf Stretch Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c003-uuid', userId: 1, name: 'Calf Stretch Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c004-uuid', userId: 1, name: 'Quad Stretch Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c005-uuid', userId: 1, name: 'Quad Stretch Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c006-uuid', userId: 1, name: 'Hamstring Stretch', duration: 125, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c007-uuid', userId: 1, name: 'Butterfly Stretch', duration: 125, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c008-uuid', userId: 1, name: '90-90 Stretch Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c009-uuid', userId: 1, name: '90-90 Stretch Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c010-uuid', userId: 1, name: 'Crow Stretch Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c011-uuid', userId: 1, name: 'Crow Stretch Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c101-uuid', userId: 1, name: 'Chest Stretch Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c102-uuid', userId: 1, name: 'Chest Stretch Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c103-uuid', userId: 1, name: 'Tricep Pull Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c104-uuid', userId: 1, name: 'Tricep Pull Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c105-uuid', userId: 1, name: 'Cat', duration: 125, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c106-uuid', userId: 1, name: 'Downward Facing Dog', duration: 125, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c107-uuid', userId: 1, name: 'Cross Body Bicep Pull Right', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c108-uuid', userId: 1, name: 'Cross Body Bicep Pull Left', duration: 65, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c109-uuid', userId: 1, name: 'Forearm Stretch', duration: 125, type: 'timed' as const, reps: null, sets: 1 },
  { id: 'c201-uuid', userId: 1, name: 'Push-ups', duration: 0, type: 'reps' as const, reps: 15, sets: 3 },
  { id: 'c202-uuid', userId: 1, name: 'Plank', duration: 60, type: 'timed' as const, reps: null, sets: 3 },
  { id: 'c203-uuid', userId: 1, name: 'Squats', duration: 0, type: 'reps' as const, reps: 20, sets: 3 },
  { id: 'c204-uuid', userId: 1, name: 'Lunges', duration: 0, type: 'reps' as const, reps: 12, sets: 2 },
  { id: 'c205-uuid', userId: 1, name: 'Rest', duration: 30, type: 'timed' as const, reps: null, sets: 1 },
];

const legSequence = [
  'c001-uuid', 'c002-uuid', 'c003-uuid', 'c004-uuid', 'c005-uuid',
  'c006-uuid', 'c007-uuid', 'c008-uuid', 'c009-uuid', 'c010-uuid', 'c011-uuid',
];

const upperSequence = [
  'c101-uuid', 'c102-uuid', 'c103-uuid', 'c104-uuid', 'c105-uuid',
  'c106-uuid', 'c107-uuid', 'c108-uuid', 'c109-uuid',
];

const strengthSequence = [
  'c201-uuid', 'c205-uuid', 'c203-uuid', 'c205-uuid', 'c204-uuid', 'c205-uuid', 'c202-uuid',
];

const sequenceRows = [
  ...legSequence.map((clockId, i) => ({
    timerId: LEG_TIMER_ID,
    clockId,
    position: i + 1,
  })),
  ...upperSequence.map((clockId, i) => ({
    timerId: UPPER_TIMER_ID,
    clockId,
    position: i + 1,
  })),
  ...strengthSequence.map((clockId, i) => ({
    timerId: STRENGTH_TIMER_ID,
    clockId,
    position: i + 1,
  })),
];

async function seed() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'better_timer_db',
  });

  const db = drizzle(pool, { mode: 'default' });

  console.log('Seeding database...');

  await db.delete(timerClockSequence);
  await db.delete(clocks);
  await db.delete(timers);

  await db.insert(timers).values(timerRows);
  console.log(`  Inserted ${timerRows.length} timers`);

  await db.insert(clocks).values(clockRows);
  console.log(`  Inserted ${clockRows.length} clocks`);

  await db.insert(timerClockSequence).values(sequenceRows);
  console.log(`  Inserted ${sequenceRows.length} sequence entries`);

  console.log('Seed complete.');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
