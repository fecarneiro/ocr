import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(3000);
