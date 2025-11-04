import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from '../services/dta-service.js';
import { sharpPNG } from '../services/image-service.js';

async function tryOCRExtraction(pdfFile: string | Buffer) {
  try {
    const document = await pdf(pdfFile, { scale: 2 });
    console.log(document);
    const worker = await createWorker('por', 1, {
      cachePath: './tessdata',
      cacheMethod: 'write',
    });

    let data: string = '';
    for await (const image of document) {
      const ocrReadyImage = await sharpPNG(image);
      const {
        data: { text },
      } = await worker.recognize(ocrReadyImage);

      data += text;
    }

    const result = await matchFields(data);
    await worker.terminate();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error extracting text with OCR', error);
    return {
      success: false,
    };
  }
}

export { tryOCRExtraction };
