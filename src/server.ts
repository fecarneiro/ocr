import express, { type Request, type Response } from 'express';

const PORT = 3000;
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(PORT);
