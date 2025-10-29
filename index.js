import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { dtaGeralRegex, dtaLocationRegex } from './regex/dtaRegex.js';
import { PDFParse } from 'pdf-parse';

async function main(file) {
  //1
  try {
    const buffer = await fs.readFile(file);
    const parser = new PDFParse({ data: buffer });
    let result = await parser.getText(parser);

    result.pages.forEach((x) => {
      if (!x.text) {
        throw 'The provided file is not a valid TEXT pdf. Switching to OCR extraction instead.';
      }
    });

    result = result.text;
    console.log('Extracted with pdf-parse.');
    console.log(result);
    return;
  } catch (err) {
    console.error(err);
  }

  //2
  try {
    const document = await pdf(file, { scale: 4 });
    const worker = await createWorker('por');
    let extractedText = '';

    for await (const image of document) {
      const {
        data: { text },
      } = await worker.recognize(image);
      extractedText += text;
    }

    let result = {};
    for await (const [key, value] of Object.entries(dtaGeralRegex)) {
      const fullMatch = extractedText.match(value);
      const match = fullMatch ? fullMatch[1] : null;
      result[key] = match;
    }

    const locations = [];
    const location = extractedText.matchAll(dtaLocationRegex);
    for (const x of location) {
      locations.push(x[1]);
    }

    result.origin = locations[0];
    result.destination = locations[1];
    console.log(result);
    await worker.terminate();
    return result;
  } catch (e) {
    console.error(e.message);
  }
}

const file = process.argv[2] || 'pdf/dta.pdf';
main(file);
