import express from 'express';
import config from './server/config/env.js';

const app = express();
app.use(express.json());

app.listen(config.port, () => {
  console.log(`Server listening on port {config.port}`);
});
