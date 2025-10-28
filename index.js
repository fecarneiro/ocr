import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { dtaGeralRegex, dtaLocationRegex } from './regex/dtaRegex.js';
import { PDFParse } from 'pdf-parse';

async function main(pdfPath) {
  try {
    const buffer = await fs.readFile(file);
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText(parser);
    console.log(result.text);
    console.log('1) PDF-PARSE');
    throw new Error();
  } catch {
    const document = await pdf(pdfPath, { scale: 4 });
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
    console.log('2) OCR');
    await worker.terminate();
    return result;
  }
}

const pdfPath = process.argv[2] || 'dta2.pdf';
main(pdfPath);
