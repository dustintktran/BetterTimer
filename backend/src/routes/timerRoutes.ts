import { Router } from 'express';
import crypto from 'crypto';
import { db } from '../db/connection';
import { timers, clocks, timerClockSequence} from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /api/timers
router.get('/', async (req, res) => {
  try {
    const allTimers = await db
      .select({
        id: timers.id,
        title: timers.title,
        userId: timers.userId,
      })
      .from(timers);

    res.json(allTimers);
  } catch (error) {
    console.error("Error fetching all timers:", error);
    res.status(500).json({ error: "Failed to fetch timers" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const rows = await db
      .select({
        timerId: timers.id,
        timerTitle: timers.title,
        clockId: clocks.id,
        clockName: clocks.name,
        duration: clocks.duration,
        clockType: clocks.type,
        reps: clocks.reps,
        sets: clocks.sets,
        position: timerClockSequence.position,
      })
      .from(timers)
      .leftJoin(timerClockSequence, eq(timers.id, timerClockSequence.timerId))
      .leftJoin(clocks, eq(timerClockSequence.clockId, clocks.id))
      .where(eq(timers.id, id))
      .orderBy(timerClockSequence.position);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Timer not found" });
    }

    const formattedResponse = {
      id: rows[0].timerId,
      title: rows[0].timerTitle,
      clocks: rows.map(row => ({
        id: row.clockId,
        name: row.clockName,
        duration: row.duration,
        type: row.clockType,
        reps: row.reps,
        sets: row.sets,
        position: row.position
      })).filter(clock => clock.id !== null) // Handle cases where a timer has 0 clocks
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/timers
router.post('/', async (req, res) => {
  try {
    const { title, clocks: clockInputs } = req.body;

    if (!title || !Array.isArray(clockInputs) || clockInputs.length === 0) {
      return res.status(400).json({ error: 'Title and at least one clock are required' });
    }

    const timerId = crypto.randomUUID();

    await db.insert(timers).values({
      id: timerId,
      userId: 1,
      title,
    });

    const clockRows = clockInputs.map((clock: { name: string; duration: number; type?: 'timed' | 'reps'; reps?: number; sets?: number }) => ({
      id: crypto.randomUUID(),
      userId: 1,
      name: clock.name,
      duration: clock.type === 'reps' ? 0 : clock.duration,
      type: clock.type || 'timed',
      reps: clock.reps || null,
      sets: clock.sets || 1,
    }));

    await db.insert(clocks).values(clockRows);

    const sequenceRows = clockRows.map((clock, index) => ({
      timerId,
      clockId: clock.id,
      position: index + 1,
    }));

    await db.insert(timerClockSequence).values(sequenceRows);

    res.status(201).json({ id: timerId, title, clocks: clockRows });
  } catch (error) {
    console.error('Error creating timer:', error);
    res.status(500).json({ error: 'Failed to create timer' });
  }
});

export default router;