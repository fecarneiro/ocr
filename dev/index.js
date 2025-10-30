import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from './src/services/dta-service.js';
import { PDFParse } from 'pdf-parse';
import path from 'node:path';

async function tryTextExtraction(pdfFile) {
  try {
    const buffer = await fs.readFile(pdfFile);
    const parser = new PDFParse({ data: buffer });
    const extractor = await parser.getText(parser);
    const extractedPages = extractor.pages;

    for (let page of extractedPages) {
      if (!page.text) {
        return { success: false };
      }
    }

    const data = extractor.text;
    const result = await matchFields(data);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return {
      success: false,
    };
  }
}

async function tryOCRExtraction(pdfFile) {
  try {
    const document = await pdf(pdfFile, { scale: 2 });

    const worker = await createWorker('por');
    let data = '';

    for await (const image of document) {
      const {
        data: { text },
      } = await worker.recognize(image);
      data += text;
    }

    //debug
    const writeData = await fs.writeFile('text.txt', data);

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

async function main(pdfFile) {
  if (path.extname(pdfFile) != '.pdf') {
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

const pdfFile = process.argv[2] || 'pdf/dta3-png.pdf';
main(pdfFile);
