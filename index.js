import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';

async function main(pdfPath) {
  const document = await pdf(pdfPath, { scale: 3 });
  const worker = await createWorker('por');

  for await (const image of document) {
    const {
      data: { text },
    } = await worker.recognize(image);
    await fs.writeFile('extraction.txt', text, 'utf8');
    console.log(text);
    await worker.terminate();
  }
}

main('example.pdf');
