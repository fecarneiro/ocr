import { tryOCRExtraction } from '../src/core/ocr-processor.js';
import { expect, test, describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.resolve(__dirname, '..', 'data', 'input');

describe('OCR extraction from manual conversion to image', () => {
  it('OCR with dta1-png.png to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta1-png.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.success).toBe(true);
    expect;
  });
});
