import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { dtaGeralRegex, dtaLocationRegex } from './regex/dtaRegex.js';

async function main(pdfPath) {
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
  const locations = extractedText.matchAll(/Unidade\s+Local\s*:\s*([^\n]+)/g);
  for (const location of locations) {
    locs.push(location[1]);
  }

  result.origin = locs[0];
  result.destination = locs[1];
  console.log(result);

  await worker.terminate();
  return result;
}

const pdfPath = process.argv[2] || 'dta3.pdf';
main(pdfPath);
