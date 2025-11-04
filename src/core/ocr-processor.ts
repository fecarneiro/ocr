import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFieldsWithRegex } from '../services/dta-service.js';
import sharp from 'sharp';
import type { Worker } from 'tesseract.js';
import type { DtaResult } from '../types/index.ts';

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
  console.log('[sharp]buffer length ', pages.length);
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

async function recognizeImage(
  worker: Worker,
  images: Buffer[]
): Promise<string> {
  let extractedText: string = '';
  for await (const image of images) {
    const {
      data: { text },
    } = await worker.recognize(image);
    extractedText += text;
  }
  return extractedText;
}

function regexMatch(text: string): DtaResult {
  const regexObjectResult = matchFieldsWithRegex(text);
  return regexObjectResult;
}

async function tryOCRExtraction(pdfFile: string | Buffer) {
  console.log('iniciando OCR para: ', pdfFile);
  try {
    const worker = await createTesseractWorker();
    const images = await pdfToImage(pdfFile);
    const optimizedImages = await optimizeImage(images);
    const extractedText = await recognizeImage(worker, optimizedImages);
    const ocrExtractionResult = regexMatch(extractedText);
    await worker.terminate();
    return { success: true, data: ocrExtractionResult };
  } catch (error) {
    console.error('Error extracting text with OCR', error);
    return { success: false };
  }
}

export {
  tryOCRExtraction,
  pdfToImage,
  optimizeImage,
  recognizeImage,
  createTesseractWorker,
  regexMatch,
};
