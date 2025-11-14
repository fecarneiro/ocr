import { type Request, type Response } from 'express';
import { ocrProcessor } from '../services/ocr-processor-service.js';
import { textProcessor } from '../services/text-processor-service.js';

export async function dtaController(req: Request, res: Response) {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Missing file' });
  }

  try {
    const fileBuffer = req.file.buffer;
    const extractedText = await textProcessor(fileBuffer);

    if (extractedText.success) {
      return res.status(200).json({
        success: true,
        data: extractedText.data,
        message: 'Text extracted using Text Parse',
      });
    }

    const extractedOcr = await ocrProcessor(fileBuffer);

    if (extractedOcr.success) {
      return res.status(200).json({
        success: true,
        data: extractedOcr.data,
        message: 'Text extracted using PDF OCR',
      });
    }

    return res.status(500).json({
      success: false,
      data: null,
      message: 'Failed extracting data with both options: PDF Parse and OCR',
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
