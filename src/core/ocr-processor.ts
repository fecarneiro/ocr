import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from '../services/dta-service.js';
import { sharpPNG } from '../services/image-service.js';

async function createTesseractWorker() {
  const worker = await createWorker('por', 1, {
    cachePath: './tessdata',
    cacheMethod: 'write',
  });
  return worker;
}

async function pdfToImage(pdfFile: string | Buffer) {
  let counter = 1;
  const pages = [];
  const document = await pdf(pdfFile, { scale: 2 });
  for await (const image of document) {
    await fs.writeFile(`./data/output/page${counter}.png`, image);
    counter++;
  }
}
async function tryOCRExtraction(pdfFile: string | Buffer) {
  console.log('iniciando OCR para: ', pdfFile);
  try {
    const worker = await createTesseractWorker();
    // const images = pdfToImage(pdfFile);
    let data: string = '';

    for await (const image of document) {
      const ocrReadyImage = await sharpPNG(image);
      const {
        data: { text },
      } = await worker.recognize(ocrReadyImage);

      data += text;
    }

    await fs.writeFile('./data/outputtext.txt', data);

    console.log(data);
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

export { tryOCRExtraction, pdfToImage };
