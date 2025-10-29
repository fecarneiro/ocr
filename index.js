import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from './src/services/dta-service.js';
import { PDFParse } from 'pdf-parse';
import { SuccessResult, FailureResult } from './src/services/result-helpers';

async function tryTextExtraction() {
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
    return SuccessResult {
      success,

    }
  } catch (err) {
    console.error(err);
  }
}

async function tryOCRExtraction() {}

async function main(file) {
  //1

  //2
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

    const result = await matchFields(data);
    await worker.terminate();

    console.log(result);
    return result;
  } catch (e) {
    console.error(e.message);
  }
}

const file = process.argv[2] || 'pdf/dta-png.pdf';
main(file);
