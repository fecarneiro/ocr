import express, { type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import { uploadController } from './upload-controller.js';
import type { ValidDocType } from '../types/types.js';

const PORT = 3000;
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); //TODO: fileFilter multer

function validateFile(req: Request, res: Response, next: NextFunction) {
  if (!req.file) {
    return res.status(400).send('missing file');
  }
  next();
}

function validateDocType(req: Request, res: Response, next: NextFunction) {
  const validTypes: ValidDocType[] = ['dta', 'di', 'nfe'];
  const reqDocType = req.params.docType;
  if (!reqDocType) {
    return res.status(400).send('missing path param with document type');
  }
  if (!validTypes.includes(reqDocType as ValidDocType)) {
    return res.status(400).send('document type not allowed');
  }
  next();
}

app.post(
  '/upload/:docType',
  upload.single('file'),
  validateFile,
  validateDocType,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileBuffer: Buffer = req.file!.buffer;
      const docType: string = req.params.docType!;
      const result = await uploadController(fileBuffer, docType);
      res.send(result);
    } catch (err) {
      next(err);
    }
  },
);

app.use((err: Error, req: Request, res: Response) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log('--server running');
});
