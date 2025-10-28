import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';
import { dtaPatterns } from './regex/dta';

async function main(pdfPath) {
  const document = await pdf(pdfPath, { scale: 3 });
  const worker = await createWorker('por');

  let file = Math.floor(Math.random() * 1000000);
  let data = '';

  for await (const image of document) {
    const {
      data: { text },
    } = await worker.recognize(image);
    data += text;
    await fs.appendFile(`ext${file}.txt`, text, 'utf8');
    // console.log(text);
  }
  console.log(data);
  await worker.terminate();
}

const pdfPath = process.argv[2] || 'di.pdf';
main(pdfPath);
