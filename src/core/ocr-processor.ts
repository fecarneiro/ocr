import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from '../services/dta-service.js';
import sharp from 'sharp';
import type { Worker } from 'tesseract.js';

async function createTesseractWorker(): Promise<Worker> {
  const worker = await createWorker('por', 1, {
    cachePath: './tessdata',
    cacheMethod: 'write',
  });
  return worker;
}

async function pdfToImage(pdfFile: string | Buffer): Promise<Buffer[]> {
  let counter = 1;
  const pages: Buffer[] = [];
  const document = await pdf(pdfFile, { scale: 2 });
  for await (const image of document) {
    await fs.writeFile(`./data/output/page${counter}.png`, image);
    pages.push(image);
    counter++;
  }
  return pages;
}
async function optimizeImage(pages: Buffer[]): Promise<Buffer[]> {
  console.log('buffer length ', pages.length);
  let counter = 1;
  const optimizedPages: Buffer[] = [];
  for await (const page of pages) {
    const optmizedPage = await sharp(page)
      .greyscale()
      .normalise()
      .sharpen()
      .toBuffer();
    await fs.writeFile(`./data/output/opt-page${counter}.png`, optmizedPage);
    optimizedPages.push(optmizedPage);
    counter++;
  }
  return optimizedPages;
}

async function recognizeImage(worker: Worker, images: Array<Buffer[]>) {
  // let data: string = '';
  const {
    data: { text },
  } = await worker.recognize(images);
  // data += text;
  return text;
}

async function tryOCRExtraction(pdfFile: string | Buffer) {
  console.log('iniciando OCR para: ', pdfFile);
  try {
    const worker = await createTesseractWorker();
    // const images = pdfToImage(pdfFile);
    // const optimizedImages = optmizeImage(pdfFile);

    for await (const image of document) {
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

export { tryOCRExtraction, pdfToImage, optimizeImage, recognizeImage };
