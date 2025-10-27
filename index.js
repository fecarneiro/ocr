import fs from 'node:fs/promises';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from 'canvas';

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'pdfjs-dist/legacy/build/pdf.worker.mjs';

/**
 * Node: binários chamado Buffer
 * pdfjs-dist foi feito para navegador, e espera Uint8Array
 *
 */

async function readFile() {
  try {
    const dataBuffer = await fs.readFile('example.pdf');
    const uint8Array = new Uint8Array(dataBuffer);
    const loadingTask = pdfjsLib.getDocument(uint8Array);
    const pdf = loadingTask.promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent()

      const pageText = text.content
  } catch (err) {
    console.log(err);
  }
}
}
readFile();
// task.promise.then((pdf) => {
//   console.log(`pdf loaded. total pages: ${pdf.numPages}`);
// });
