import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { dtaRegex } from './regex/dtaRegex.js';

async function main(pdfPath) {
  const document = await pdf(pdfPath, { scale: 4 });
  const worker = await createWorker('por');

  let file = Math.floor(Math.random() * 1000000);
  let extractedText = '';

  for await (const image of document) {
    const {
      data: { text },
    } = await worker.recognize(image);
    extractedText += text;
    // console.log(text);
    // await fs.appendFile(`ext${file}.txt`, text, 'utf8');
  }

  let result = {};
  for await (const [key, value] of Object.entries(dtaRegex)) {
    const fullMatch = extractedText.match(value);
    const match = fullMatch ? fullMatch[1] : null;
    result[key] = match;
    // console.log(`${key}: ${match}`);
  }

  console.log(result);
  await worker.terminate();
  return result;
}

const pdfPath = process.argv[2] || 'dta.pdf';
main(pdfPath);
