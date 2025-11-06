import express, { type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { documentProcessor } from './upload-controller.js';
import type { ValidDocType } from '../types/types.js';

const PORT = 3000;
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //TODO: fileFilter multer

function validateFile(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    res.status(400).send('missing file');
    return;
  }
  next();
}

function validateDocType(req: Request, res: Response, next: NextFunction) {
  const validTypes: ValidDocType[] = ['dta', 'di', 'nfe'];
  const reqDocType = req.params.docType;
  if (!reqDocType) {
    res.status(400).send('missing path param with document type');
    return;
  }
  if (!validTypes.includes(reqDocType as ValidDocType)) {
    res.status(400).send('missing file');
    return;
  }
  next();
}

app.post(
  '/upload/:docType',
  upload.single('file'),
  validateDocType,
  async (req: Request, res: Response) => {
    try {
      const fileBuffer: Buffer = req.file.buffer;
      await documentProcessor(fileBuffer);
      res.send('Hello World');
    } catch (err) {
      console.error(err);
      res.status(500).send('upload failed');
    }
  },
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ erro: err.message });
});

app.listen(PORT, () => {
  console.log('--server running');
});
