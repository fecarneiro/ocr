import path from 'node:path';
import { tryOCRExtraction } from '../core/ocr-processor.js'; //TODO: FRAGIL: bug na ordem
import { tryTextExtraction } from '../core/pdf-extractor.js';

async function documentProcessor(pdfFile: Buffer) {
  if (typeof pdfFile === 'string' && path.extname(pdfFile) != '.pdf') {
    return {
      success: false,
      data: null,
      message: 'The provided file is not a PDF type.',
    };
  }

  const pdfParse = await tryTextExtraction(pdfFile);

  if (pdfParse.success) {
    return {
      success: true,
      data: pdfParse.data,
      message: 'Text extracted using PDF Parse',
    };
  }

  const pdfOCR = await tryOCRExtraction(pdfFile);

  if (pdfOCR.success) {
    return {
      success: true,
      data: pdfOCR.data,
      message: 'Text extracted using PDF OCR',
    };
  }

  return console.log({
    success: false,
    data: null,
    message: 'Failed extracting data with both options: PDF Parse and OCR',
  });
}

export { documentProcessor };
