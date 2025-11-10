import fs from 'node:fs/promises';
import { pdf } from 'pdf-to-img';
import sharp from 'sharp';
import type { Worker } from 'tesseract.js';
import { createWorker, PSM } from 'tesseract.js';
import { matchFieldsWithRegex } from '../src/services/regex-services.js';
import type { DtaResult, ValidDocType } from '../src/types/types.js';

async function createTesseractWorker(): Promise<Worker> {
  const worker = await createWorker('por', 1, {
    cachePath: './tessdata',
    cacheMethod: 'write',
  });
  await worker.setParameters({
    tessedit_char_whitelist:
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzÀÁÃÂÇÉÊÍÓÔÕÚàáãâçéêíóôõú .:/-,()',
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK, //TESTE PSM6!!
  });
  return worker;
}

async function pdfToImage(pdfFile: string | Buffer): Promise<Buffer[]> {
  const pages: Buffer[] = [];
  const document = await pdf(pdfFile, { scale: 3 });
  for await (const image of document) {
    pages.push(image);
  }
  return pages;
}

async function recognizeImage(worker: Worker, images: Buffer[]): Promise<string> {
  let extractedText: string = '';
  for await (const image of images) {
    const {
      data: { text },
    } = await worker.recognize(image);
    extractedText += text;
  }
  return extractedText;
}

function regexMatch(text: string, docType: ValidDocType) {
  const regexObjectResult = matchFieldsWithRegex(text, docType);
  return regexObjectResult;
}
// TODO: pdf-parse: getScreenshot — Render Pages as PNG (testar no lugar de pdf2img)
async function tryOCRExtraction(pdfFile: string | Buffer) {
  const worker = await createTesseractWorker();
  try {
    const images = await pdfToImage(pdfFile);
    const text = await recognizeImage(worker, images);
    await fs.writeFile('./data/output/data.txt', text);
  } catch (error) {
    console.error('Error extracting text with OCR', error);
    return { success: false };
  } finally {
    await worker.terminate();
  }
}

tryOCRExtraction('nf.pdf');
