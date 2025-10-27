import fs from 'node:fs/promises';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';
import { createCanvas } from 'canvas';
import Tesseract from 'tesseract.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configure worker path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

pdfjsLib.GlobalWorkerOptions.workerSrc = join(
  __dirname,
  'node_modules/pdfjs-dist/legacy/build/pdf.worker.js'
);

/**
 * Renders a PDF page to canvas
 */
async function renderPageToCanvas(page, scale = 2.0) {
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d', { alpha: false });

  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;

  return canvas;
}

/**
 * Extracts text from a PDF using OCR
 */
async function ocrPdf(filePath, options = {}) {
  const {
    language = 'por', // Language (eng, por, spa, etc)
    scale = 2.0, // Quality (1.5 to 3.0)
    saveImages = false, // Save debug images?
    outputFile = 'result.txt', // Output file
  } = options;

  console.log('Loading PDF:', filePath);

  // 1. Initialize Tesseract
  const worker = await Tesseract.createWorker(language, 1, {
    logger: (m) => {
      if (m.status === 'recognizing text') {
        process.stdout.write(`\rProgress: ${Math.round(m.progress * 100)}%`);
      }
    },
  });

  try {
    // 2. Load PDF
    const dataBuffer = await fs.readFile(filePath);
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(dataBuffer),
      useSystemFonts: true,
    }).promise;

    console.log(`\nTotal pages: ${pdf.numPages}\n`);

    let fullText = '';
    const results = [];

    // 3. Process each page
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Processing page ${i}/${pdf.numPages}...`);

      const page = await pdf.getPage(i);
      const canvas = await renderPageToCanvas(page, scale);

      // Convert canvas to PNG buffer
      const imageBuffer = canvas.toBuffer('image/png');

      // Save image (optional - debug)
      if (saveImages) {
        await fs.writeFile(`debug-page-${i}.png`, imageBuffer);
        console.log(`  Image saved: debug-page-${i}.png`);
      }

      // OCR on image
      const {
        data: { text, confidence },
      } = await worker.recognize(imageBuffer);

      const pageText = `\n${'='.repeat(
        50
      )}\nPAGE ${i} (Confidence: ${confidence.toFixed(1)}%)\n${'='.repeat(
        50
      )}\n${text}`;

      fullText += pageText;
      results.push({ page: i, text, confidence });

      console.log(
        `  Extracted: ${
          text.length
        } characters (confidence: ${confidence.toFixed(1)}%)`
      );
      console.log(
        `  Preview: ${text.substring(0, 100).replace(/\n/g, ' ')}...\n`
      );
    }

    // 4. Save result
    await fs.writeFile(outputFile, fullText);
    console.log(`\nOCR completed! Saved to: ${outputFile}`);

    // 5. Statistics
    const avgConfidence =
      results.reduce((sum, r) => sum + r.confidence, 0) / results.length;
    console.log(`\nStatistics:`);
    console.log(`   Total pages: ${pdf.numPages}`);
    console.log(`   Total characters: ${fullText.length}`);
    console.log(`   Average confidence: ${avgConfidence.toFixed(1)}%`);

    return {
      text: fullText,
      pages: results,
      stats: {
        totalPages: pdf.numPages,
        totalChars: fullText.length,
        avgConfidence,
      },
    };
  } catch (error) {
    console.error('\nError during OCR:', error.message);
    throw error;
  } finally {
    // 6. Clean up resources
    await worker.terminate();
    console.log('Resources released');
  }
}

// EXECUTE
const pdfPath = process.argv[2] || 'test.pdf';

ocrPdf(pdfPath, {
  language: 'por', // Language
  scale: 2.0, // Quality (2.0 = good balance)
  saveImages: false, // true = save debug images
  outputFile: 'result.txt',
})
  .then((result) => {
    console.log('\nProcess completed successfully!');
  })
  .catch((err) => {
    console.error('\nFailure:', err);
    process.exit(1);
  });
