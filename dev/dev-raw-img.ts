import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from '../src/services/dta-service.js';

async function tryOCRExtraction(pdfFile: string | Buffer) {
  try {
    const document = await pdf(pdfFile, { scale: 2 });
    const worker = await createWorker('por', 1, {
      cachePath: './tessdata',
      cacheMethod: 'write',
    });
    let data: string = '';

    for await (const image of document) {
      const {
        data: { text },
      } = await worker.recognize(image);
      data += text;
      await fs.writeFile('./data/output/image.png', image);
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

tryOCRExtraction('data/input/dta1-png.pdf');
