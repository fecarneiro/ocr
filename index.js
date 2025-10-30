import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from './src/services/dta-service.js';
import { PDFParse } from 'pdf-parse';
import path from 'node:path';

async function tryTextExtraction(pdfFile) {
  try {
    const buffer = await fs.readFile(file);
    const parser = new PDFParse({ data: buffer });
    const extractor = await parser.getText(parser);

    extractor.pages.forEach((page) => {
      if (!page.text) {
        return { success: false };
      }
    });

    const data = extractor.text;
    const result = await matchFields(data);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return { success: false };
  }
}

async function tryOCRExtraction(file) {
  try {
    const document = await pdf(file, { scale: 4 });
    const worker = await createWorker('por');
    let data = '';

    for await (const image of document) {
      const {
        data: { text },
      } = await worker.recognize(image);
      data += text;
    }
    //TODO: ver oq acontece se deixar terminate antes deste matchFields
    const result = await matchFields(data);
    await worker.terminate();
    return { success: true, data: result };
  } catch (e) {
    console.error('Error extracting text with OCR', error);
    return { success: false };
  }
}

async function main(file) {
  //TODO: ja deixar planejado para o multer
  if (path.extname(file) != '.pdf') {
    return { success: false, message: 'The file is not a PDF type.' };
  }

  const pdfParse = await tryTextExtraction(file);

  if (pdfParse.success == false) {
    const OCRExtraction = await tryOCRExtraction(file);
    // >>>>>>>>>>>>>>>
    // Continuar
  } else {
    return { success: true, message: 'PDF parsed with success.' };
  }
}

const file = process.argv[2] || 'pdf/dta.pdf';
main(file);
