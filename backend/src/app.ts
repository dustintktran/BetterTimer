import express from 'express';
import cors from 'cors';
import timerRoutes from './routes/timerRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/timers', timerRoutes);

export { app };
