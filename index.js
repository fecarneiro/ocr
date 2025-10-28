import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';

async function main(pdfPath) {
  const document = await pdf(pdfPath, { scale: 3 });
  const worker = await createWorker('por');

  let file = Math.random() * 100;
  for await (const image of document) {
    const {
      data: { text },
    } = await worker.recognize(image);
    await fs.appendFile(`extraction${file}.txt`, text, 'utf8');
    console.log(text);
  }
  await worker.terminate();
}

const pdfPath = process.argv[2] || 'di.pdf';
main(pdfPath);
