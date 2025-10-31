import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from './services/dta-service.js';

import path from 'node:path';
import { sharpPNG } from './services/sharp-service.js';

async function tryOCRExtraction(pdfFile) {
  try {
    const document = await pdf(pdfFile, { scale: 2 });
    const worker = await createWorker('por', 1, {
      cachePath: './tessdata',
      cacheMethod: 'write',
    });
    let data = '';

    for await (const image of document) {
      const ocrReadyImage = await sharpPNG(image);

      await fs.writeFile('image.png', ocrReadyImage);
      const {
        data: { text },
      } = await worker.recognize(ocrReadyImage);
      data += text;
    }

    await fs.writeFile('text.txt', data);

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

async function main(pdfFile) {
  if (path.extname(pdfFile) != '.pdf') {
    return {
      success: false,
      data: null,
      message: 'The provided file is not a PDF type.',
    };
  }

  const pdfParse = await tryTextExtraction(pdfFile);

  if (pdfParse.success) {
    return console.log({
      success: true,
      data: pdfParse.data,
      message: 'Text extracted using PDF Parse',
    });
  }

  const pdfOCR = await tryOCRExtraction(pdfFile);

  if (pdfOCR.success) {
    return console.log({
      success: true,
      data: pdfOCR.data,
      message: 'Text extracted using PDF OCR',
    });
  }

  return console.log({
    success: false,
    data: null,
    message: 'Failed extracting data with both options: PDF Parse and OCR',
  });
}

const pdfFile = process.argv[2] || 'pdf/dta1-png.pdf';
main(pdfFile);
