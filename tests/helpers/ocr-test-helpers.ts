import {
  optimizeImage,
  recognizeImage,
  createTesseractWorker,
  regexMatch,
  optimizeImageMetrics,
  tryOCRExtraction,
} from '../../src/core/ocr-processor.js';
import { pdf } from 'pdf-to-img';
import { createWorker, PSM } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFieldsWithRegex } from '../services/dta-service.js';
import sharp from 'sharp';
import type { Worker } from 'tesseract.js';
import type { DtaResult } from '../types/index.ts';

async function pdfToImageConfig(
  pdfFile: string | Buffer,
  scaleNum: number
): Promise<Buffer[]> {
  const pages: Buffer[] = [];
  const document = await pdf(pdfFile, { scale: scaleNum });
  for await (const image of document) {
    pages.push(image);
  }
  return pages;
}
async function optimizeImageConfig(pages: Buffer[]): Promise<Buffer[]> {
  let counter = 1;
  const optimizedPages: Buffer[] = [];
  for await (const page of pages) {
    const optmizedPage = await sharp(page)
      .greyscale()
      .normalise()
      .linear(1.6, 0)
      .sharpen()
      .png()
      .toBuffer();
    await fs.writeFile(`./data/output/opt-page${counter}.png`, optmizedPage);
    optimizedPages.push(optmizedPage);
    counter++;
  }
  return optimizedPages;
}

async function testOCRWithConfigs(pdfFile: string | Buffer): Promise<object> {
  try {
    const worker = await createTesseractWorker();
    const images = await pdfToImageConfig(pdfFile, scaleNum);
    const optimizedImages = await optimizeImage(images);
    // const optimizedImages = await optimizeImageMetrics(images);
    const extractedText = await recognizeImage(worker, optimizedImages);
    const ocrExtractionResult = regexMatch(extractedText);
    await worker.terminate();
    console.log(extractedText);
    console.log(ocrExtractionResult);
  } catch (error) {
    console.error(error);
  }
  return;
}
//testando com scale 4
testOCRWithConfigs('./data/input/dta4.pdf');
