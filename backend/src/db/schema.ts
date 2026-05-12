import { mysqlTable, varchar, int, mysqlEnum, char, primaryKey } from 'drizzle-orm/mysql-core';

// Clocks Table
export const clocks = mysqlTable('clocks', {
  id: char('id', { length: 36 }).primaryKey(),
  userId: int('user_id').default(1),
  name: varchar('name', { length: 255 }).notNull(),
  duration: int('duration').notNull(),
});

// Timers Table
export const timers = mysqlTable('timers', {
  id: char('id', { length: 36 }).primaryKey(),
  userId: int('user_id').default(1),
  title: varchar('title', { length: 255 }).notNull(),
});

// Join Table (Sequence)
export const timerClockSequence = mysqlTable('timer_clock_sequence', {
  id: int('id').autoincrement().primaryKey(),
  timerId: char('timer_id', { length: 36 }).notNull(),
  clockId: char('clock_id', { length: 36 }).notNull(),
  position: int('position').notNull(),
});