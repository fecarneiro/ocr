import express, { type Request, type Response } from 'express';
import multer from 'multer';
import { uploadController } from './controllers/upload.controller.js';

const PORT = 3000;
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single, async (req: Request, res: Response) => {
  const file = req.file;
  const method = req.body;
  await uploadController(file: Buffer);
  res.send('Hello World');
});

app.listen(PORT);
