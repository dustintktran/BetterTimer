import express, { Request, Response } from 'express';
import pool from './db';

const app = express();
const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});