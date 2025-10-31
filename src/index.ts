import { tryTextExtraction } from './core/pdf-extractor.js';
import { tryOCRExtraction } from './core/ocr-processor.js';
import path from 'node:path';

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
}

const pdfFile = 'data/input/dta1.pdf';
main(pdfFile);
