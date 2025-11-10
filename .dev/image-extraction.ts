import {
  pdfToImage,
  optimizeImage,
  recognizeImage,
  createTesseractWorker,
} from '../src/core/ocr-processor.js';
import fs from 'node:fs/promises';

async function fn(pdfFile: string) {
  try {
    const worker = await createTesseractWorker();
    const images = await pdfToImage(pdfFile);
    const optimizedImages = await optimizeImage(images);
    const extractedText = await recognizeImage(worker, optimizedImages);
    // const ocrExtractionResult = regexMatch(extractedText);
    await worker.terminate();
    await fs.writeFile('extracted.txt', extractedText);
  } catch (error) {
    console.error(error);
  }
  return;
}

fn('./data/input/nfe1.pdf');
