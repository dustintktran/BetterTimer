import path from 'path';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { app } from './app';
import { db } from './db/connection';

export { db };

const PORT = 5000;

const start = async () => {
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: path.join(__dirname, '..', 'migrations') });
    console.log('Migrations applied successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();