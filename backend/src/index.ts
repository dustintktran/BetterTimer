import express from 'express';
import cors from 'cors';
import { drizzle } from 'drizzle-orm/mysql2';
import * as schema from './db/schema';
import mysql from 'mysql2/promise';
import timerRoutes from './routes/timerRoutes';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'better_timer_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/timers', timerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const db = drizzle(pool, { schema, mode: 'default' });