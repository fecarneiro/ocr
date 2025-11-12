import { Router, type Request, type Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

//TODO: multer file validation (user input) https://www.npmjs.com/package/multer
//TODO: error handling

router.post('/dta', upload.single('dta'), (req: Request, res: Response) => {
  const file = req.file;
  console.log(file);
  res.send('dta received');
});

router.post('/di', (req: Request, res: Response) => {});

router.post('/di', (req: Request, res: Response) => {});
