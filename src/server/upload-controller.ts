import path from 'node:path';
import { tryOCRExtraction } from '../core/ocr-processor.js'; //TODO: FRAGIL: bug na ordem
import { tryTextExtraction } from '../core/pdf-extractor.js';
import type { ValidDocType } from '../types/types.js';

async function uploadController(pdfFile: Buffer, docType: ValidDocType) {
  const pdfParse = await tryTextExtraction(pdfFile, docType);
  // TODO: try catch?
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
  return {
    success: false,
    data: null,
    message: 'Failed extracting data with both options: PDF Parse and OCR',
  };
}

export { uploadController };
