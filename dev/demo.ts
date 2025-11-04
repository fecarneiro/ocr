import { tryTextExtraction } from '../src/core/pdf-extractor.js';
import { tryOCRExtraction } from '../src/core/ocr-processor.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.resolve(__dirname, '..', 'data', 'input');

async function main(pdfFile: string | Buffer) {
  if (typeof pdfFile === 'string' && path.extname(pdfFile) != '.pdf') {
    return {
      success: false,
      data: null,
      message: 'The provided file is not a PDF type.',
    };
  }

  const pdfParse = await tryTextExtraction(pdfFile);
  if (pdfParse.success) {
    const jsonParse = JSON.stringify(pdfParse.data, null, 2);
    await fs.appendFile(`text-extraction.txt`, jsonParse, 'utf8');

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

// const pdfArray: Array<string> = [
//   'dta1.pdf',
//   'dta2.pdf',
//   'dta3.pdf',
//   'dta4.pdf',
//   'dta5.pdf',
//   'dta6.pdf',
//   'dta7.pdf',
// ];
const pdfArray: Array<string> = ['dta1-png.pdf'];

async function fileIteration(pdfArray: Array<string>) {
  for (const file of pdfArray) {
    console.log('starting pdf:', file);
    let pdfFile = path.join(inputDir, file);
    await main(pdfFile);
  }
}
fileIteration(pdfArray);
// main(pdfFile);
