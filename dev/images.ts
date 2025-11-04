import { pdfToImage, optimizeImage } from '../src/core/ocr-processor';

async function imageExtraction(file) {
  const images = await pdfToImage(file);
  await optimizeImage(images);
}
imageExtraction('./data/input/dta5.pdf');
