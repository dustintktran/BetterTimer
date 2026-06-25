import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

let mockFromResult: unknown = [];
let mockOrderByResult: unknown = [];
let mockInsertError: Error | null = null;

vi.mock('../db/connection', () => {
  const createChain = () => ({
    leftJoin: () => ({
      leftJoin: () => ({
        where: () => ({
          orderBy: () => {
            if (mockOrderByResult instanceof Error) throw mockOrderByResult;
            return mockOrderByResult;
          },
        }),
      }),
    }),
  });

  return {
    db: {
      select: () => ({
        from: () => {
          if (mockFromResult instanceof Error) throw mockFromResult;
          const result = mockFromResult;
          return Object.assign(Promise.resolve(result), createChain());
        },
      }),
      insert: () => ({
        values: () => {
          if (mockInsertError) throw mockInsertError;
          return Promise.resolve();
        },
      }),
    },
  };
});

import { app } from '../app';

describe('Timer Routes', () => {
  beforeEach(() => {
    mockFromResult = [];
    mockOrderByResult = [];
    mockInsertError = null;
  });

  describe('GET /api/timers', () => {
    it('returns all timers', async () => {
      const mockTimers = [
        { id: 't1', title: 'Leg Routine', userId: 1 },
        { id: 't2', title: 'Upper Body', userId: 1 },
      ];
      mockFromResult = mockTimers;

      const res = await request(app).get('/api/timers');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockTimers);
    });

    it('returns empty array when no timers exist', async () => {
      mockFromResult = [];

      const res = await request(app).get('/api/timers');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns 500 on database error', async () => {
      mockFromResult = new Error('DB error');

      const res = await request(app).get('/api/timers');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to fetch timers' });
    });
  });

  describe('GET /api/timers/:id', () => {
    it('returns a timer with its clocks including type, reps, sets', async () => {
      mockOrderByResult = [
        {
          timerId: 't1',
          timerTitle: 'Leg Routine',
          clockId: 'c1',
          clockName: 'Stretch A',
          duration: 60,
          clockType: 'timed',
          reps: null,
          sets: 1,
          position: 1,
        },
        {
          timerId: 't1',
          timerTitle: 'Leg Routine',
          clockId: 'c2',
          clockName: 'Push-ups',
          duration: 0,
          clockType: 'reps',
          reps: 15,
          sets: 3,
          position: 2,
        },
      ];

      const res = await request(app).get('/api/timers/t1');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: 't1',
        title: 'Leg Routine',
        clocks: [
          { id: 'c1', name: 'Stretch A', duration: 60, type: 'timed', reps: null, sets: 1, position: 1 },
          { id: 'c2', name: 'Push-ups', duration: 0, type: 'reps', reps: 15, sets: 3, position: 2 },
        ],
      });
    });

    it('returns 404 when timer is not found', async () => {
      mockOrderByResult = [];

      const res = await request(app).get('/api/timers/nonexistent');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: 'Timer not found' });
    });

    it('filters out null clock entries', async () => {
      mockOrderByResult = [
        {
          timerId: 't1',
          timerTitle: 'Empty Timer',
          clockId: null,
          clockName: null,
          duration: null,
          clockType: null,
          reps: null,
          sets: null,
          position: null,
        },
      ];

      const res = await request(app).get('/api/timers/t1');

      expect(res.status).toBe(200);
      expect(res.body.clocks).toEqual([]);
    });

    it('returns 500 on database error', async () => {
      mockOrderByResult = new Error('DB error');

      const res = await request(app).get('/api/timers/t1');

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  describe('POST /api/timers', () => {
    it('creates a timer with timed clocks', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({
          title: 'My Routine',
          clocks: [{ name: 'Plank', duration: 60, type: 'timed' }],
        });

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('My Routine');
      expect(res.body.id).toBeDefined();
      expect(res.body.clocks).toHaveLength(1);
      expect(res.body.clocks[0].name).toBe('Plank');
      expect(res.body.clocks[0].duration).toBe(60);
      expect(res.body.clocks[0].type).toBe('timed');
      expect(res.body.clocks[0].reps).toBeNull();
      expect(res.body.clocks[0].sets).toBe(1);
    });

    it('creates a timer with rep-based clocks', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({
          title: 'Strength',
          clocks: [{ name: 'Push-ups', duration: 0, type: 'reps', reps: 15, sets: 3 }],
        });

      expect(res.status).toBe(201);
      expect(res.body.clocks[0].name).toBe('Push-ups');
      expect(res.body.clocks[0].duration).toBe(0);
      expect(res.body.clocks[0].type).toBe('reps');
      expect(res.body.clocks[0].reps).toBe(15);
      expect(res.body.clocks[0].sets).toBe(3);
    });

    it('defaults type to timed when not specified', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({
          title: 'Default Type',
          clocks: [{ name: 'Stretch', duration: 30 }],
        });

      expect(res.status).toBe(201);
      expect(res.body.clocks[0].type).toBe('timed');
      expect(res.body.clocks[0].reps).toBeNull();
      expect(res.body.clocks[0].sets).toBe(1);
    });

    it('sets duration to 0 for rep-type clocks regardless of input', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({
          title: 'Rep Test',
          clocks: [{ name: 'Squats', duration: 999, type: 'reps', reps: 20 }],
        });

      expect(res.status).toBe(201);
      expect(res.body.clocks[0].duration).toBe(0);
    });

    it('creates multiple clocks with correct positions', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({
          title: 'Multi Clock',
          clocks: [
            { name: 'Push-ups', type: 'reps', reps: 15, sets: 3 },
            { name: 'Rest', duration: 30 },
            { name: 'Squats', type: 'reps', reps: 20, sets: 2 },
          ],
        });

      expect(res.status).toBe(201);
      expect(res.body.clocks).toHaveLength(3);
      expect(res.body.clocks[0].name).toBe('Push-ups');
      expect(res.body.clocks[1].name).toBe('Rest');
      expect(res.body.clocks[2].name).toBe('Squats');
    });

    it('returns 400 when title is missing', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({ clocks: [{ name: 'Stretch', duration: 30 }] });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title and at least one clock are required');
    });

    it('returns 400 when clocks array is empty', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({ title: 'Empty', clocks: [] });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title and at least one clock are required');
    });

    it('returns 400 when clocks is not an array', async () => {
      const res = await request(app)
        .post('/api/timers')
        .send({ title: 'Bad', clocks: 'not-an-array' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Title and at least one clock are required');
    });

    it('returns 500 on database error', async () => {
      mockInsertError = new Error('DB insert failed');

      const res = await request(app)
        .post('/api/timers')
        .send({
          title: 'Fail Test',
          clocks: [{ name: 'Stretch', duration: 30 }],
        });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Failed to create timer');
    });
  });
});
