import express, { type Request, type Response } from 'express';
import multer from 'multer';
import { uploadController } from './upload.controller.js';

const PORT = 3000;
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //TODO: fileFilter multer

app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).send('missing file');
    return;
  }
  try {
    const fileBuffer: Buffer = req.file.buffer;
    await uploadController(fileBuffer);
    res.send('Hello World');
  } catch (err) {
    console.error(err);
    res.status(500).send('upload failed');
  }
});

app.listen(PORT, () => {
  console.log('--server running');
});
