import { type Request, type Response } from 'express';
import { ocrProcessor } from '../services/dta/ocr-processor.js';
import { textProcessor } from '../services/dta/text-processor.js';

export async function dtaController(req: Request, _res: Response) {
  if (!req.file) {
    return { success: false, message: 'Missing file' };
  }

  try {
    const fileBuffer = req.file.buffer;
    const extractedText = await textProcessor(fileBuffer);

    if (extractedText.success) {
      return {
        success: true,
        data: extractedText.data,
        message: 'Text extracted using PDF Parse',
      };
    }

    const extractedOcr = await ocrProcessor(fileBuffer);

    if (extractedOcr.success) {
      return console.log({
        success: true,
        data: extractedOcr.data,
        message: 'Text extracted using PDF OCR',
      });
    }

    return {
      success: false,
      data: null,
      message: 'Failed extracting data with both options: PDF Parse and OCR',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: 'Unexpected error during extraction',
    };
  }
}
