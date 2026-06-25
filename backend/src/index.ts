import path from 'path';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { app } from './app';
import { db } from './db/connection';

export { db };

const PORT = 5000;
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const runMigrations = async () => {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Running migrations (attempt ${attempt}/${MAX_RETRIES})...`);
      await migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
      console.log('Migrations applied successfully.');
      return;
    } catch (error: unknown) {
      const code = (error as { cause?: { code?: string } })?.cause?.code;
      const isConnectionError = code === 'ECONNREFUSED' || code === 'ENOTFOUND';

      if (isConnectionError && attempt < MAX_RETRIES) {
        console.log(`Database not ready, retrying in ${RETRY_DELAY_MS / 1000}s...`);
        await sleep(RETRY_DELAY_MS);
      } else {
        console.error('Migration failed:', error);
        process.exit(1);
      }
    }
  }
};

const start = async () => {
  await runMigrations();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();