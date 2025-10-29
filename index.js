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
        throw 'The provided file is not a valid TEXT pdf. Switching to OCR extraction instead';
      } else {
        console.log(result);
        return;
      }
    });
  } catch (err) {
    console.error(err.message);
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

    const locs = [];
    const locations = extractedText.matchAll(dtaLocationRegex);
    for (const location of locations) {
      locs.push(location[1]);
    }

    result.origin = locs[0];
    result.destination = locs[1];
    console.log(result);
    await worker.terminate();
    return result;
  } catch (e) {
    console.error(e.message);
  }
}

const file = process.argv[2] || 'pdf/test-png.pdf';
main(file);
