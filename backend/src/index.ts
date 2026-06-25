import { app } from './app';

export { db } from './db/connection';

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});