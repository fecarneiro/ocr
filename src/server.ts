import express from 'express';
import { config } from './config/env.js';
import documentsRouter from './routes/routes.js';

const app = express();
app.use(express.json());

app.use('/api/upload', documentsRouter);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
