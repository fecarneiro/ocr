import {
  pdfToImage,
  optimizeImage,
  recognizeImage,
  createTesseractWorker,
} from '../src/core/ocr-processor.js';

async function fn(pdfFile: string) {
  try {
    const worker = await createTesseractWorker();
    const images = await pdfToImage(pdfFile);
    const optimizedImages = await optimizeImage(images);
    const extractedText = await recognizeImage(worker, optimizedImages);
    // const ocrExtractionResult = regexMatch(extractedText);
    await worker.terminate();
    console.log(extractedText);
  } catch (error) {
    console.error(error);
  }
  return;
}
//testando com scale 4
fn('./data/input/nfe1.pdf');
