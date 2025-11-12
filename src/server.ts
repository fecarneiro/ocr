import express, { type NextFunction, type Request, type Response } from 'express';
import config from './server/config/env.js';

const app = express();
app.use(express.json());

app.use('/', (req: Request, res: Response) => {
  res.send('home route');
});
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});
app.listen(config.port, () => {
  console.log(`Server listening on port {config.port}`);
});
