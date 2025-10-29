import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { matchFields } from './services/dtaService.js';
import { PDFParse } from 'pdf-parse';

async function main(file) {
  //1
  try {
    const buffer = await fs.readFile(file);
    const parser = new PDFParse({ data: buffer });
    let extractor = await parser.getText(parser);

    extractor.pages.forEach((page) => {
      if (!page.text) {
        throw 'The provided file is not a valid TEXT pdf. Switching to OCR extraction instead.';
      }
    });

    console.log('Extracting with pdf-parse.');

    const data = extractor.text;
    const result = await matchFields(data);
    console.log(result);
    return;
  } catch (err) {
    console.error(err);
  }

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
