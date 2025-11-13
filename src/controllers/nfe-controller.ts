import { type Request, type Response } from 'express';
import { config } from '../config/env.js';
import { NFeSchema } from '../models/nfe.js';
import { aiProcessor } from '../services/ai-processor-service.js';
import { promptNFe } from '../utils/ai-settings.js';

export async function nfeController(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Missing file' });
  }

  try {
    const fileBuffer = req.file.buffer;
    const fileBase64 = fileBuffer.toString('base64');
    const extractedAi = await aiProcessor(fileBase64, config.aiModel, promptNFe, NFeSchema);

    if (!extractedAi) {
      return res.status(400).json({
        success: false,
        message: 'No data could be extracted from the document',
      });
    }

    res.status(200).json({
      success: true,
      data: extractedAi,
      message: 'Text extracted using AI',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Unexpected error during extraction',
    });
  }
}
