import { Router } from 'express';
import { db } from '../index';
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
        position: row.position
      })).filter(clock => clock.id !== null) // Handle cases where a timer has 0 clocks
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;