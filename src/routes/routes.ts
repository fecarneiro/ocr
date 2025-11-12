import { Router } from 'express';
import multer from 'multer';
import { dtaController } from '../controllers/dta-controller.js';
import { diController } from '../controllers/di-controller.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = Router();

router.post('/dta', upload.single('dta'), dtaController);
router.post('/di', upload.single('dta'), diController);

export default router;
