import { Router } from 'express';
import multer from 'multer';
import { diController } from '../controllers/di-controller.js';
import { dtaController } from '../controllers/dta-controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post('/dta', upload.single('dta'), dtaController);
router.post('/di', upload.single('di'), diController);

export default router;
