// import {
//   pdfToImage,
//   optimizeImage,
//   recognizeImage,
//   createTesseractWorker,
//   regexMatch,
// } from '../src/core/ocr-processor.js';

// async function tesseractOCR(pdfFile: string | Buffer) {
//   try {
//     const worker = await createTesseractWorker();
//     const images = await pdfToImage(pdfFile);
//     const optimizedImages = await optimizeImage(images);
//     const extractedText = await recognizeImage(worker, optimizedImages);
//     const ocrExtractionResult = regexMatch(extractedText);
//     await worker.terminate();
//     // console.log(extractedText);
//     console.log(ocrExtractionResult);
//   } catch (error) {
//     console.error(error);
//   }
//   return;
// }
// //testando com scale 4
// tesseractOCR('./data/input/dta3-png.pdf');
