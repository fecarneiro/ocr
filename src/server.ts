import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import documentsRouter from './routes/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', (req, res) => {
  res.render(path.join(__dirname, 'public', 'home.html'));
});

app.use('/api/upload', documentsRouter);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
