import { tryOCRExtraction } from './core/ocr-processor.js'; //TODO: FRAGIL: bug na ordem
import { tryTextExtraction } from './core/pdf-extractor.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

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

const pdfFile = path.join(inputDir, 'dta1.pdf');
main(pdfFile);
