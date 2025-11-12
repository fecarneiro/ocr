import { type Request, type Response } from 'express';
import { DISchema } from '../models/schemas.js';
import { aiProcessor } from '../services/dta/ai-processor-service.js';
import { aiModel, promptDI } from '../utils/ai-settings.js';

export async function diController(req: Request, res: Response) {
  if (!req.file) {
    return { success: false, message: 'Missing file' };
  }

  try {
    const fileBuffer = req.file.buffer;
    const extractedAi = await aiProcessor(fileBuffer, aiModel, promptDI, DISchema);

    if (!extractedAi) {
      return res.status(400).json({
        success: false,
        message: 'No data could be extracted from the document',
      });
    }

    res.status(200).json({
      success: true,
      data: extractedAi,
      message: 'Text extracted using PDF Parse',
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: 'Unexpected error during extraction',
    };
  }
}
