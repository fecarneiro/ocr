import { tryOCRExtraction } from '../src/core/ocr-processor.js';
import { expect, test, describe, it } from 'vitest';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  DTA1_PNG,
  DTA2_PNG,
  DTA3_PNG,
  DTA1,
  DTA2,
  DTA3,
  DTA4,
  DTA5,
  DTA6,
  DTA7,
} from './fixtures/expected-result.js';
//expect.soft
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.resolve(__dirname, '..', 'data', 'input');

describe.concurrent('PDF converted (pdf-to-img) to PNG with OCR', () => {
  it('OCR with dta1.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta1.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA1);
  });

  it('OCR with dta2.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta2.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA2);
  });

  it('OCR with dta3.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta3.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA3);
  });

  it('OCR with dta4.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta4.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA4);
  });

  it('OCR with dta5.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta5.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA5);
  });

  it('OCR with dta6.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta6.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA6);
  });

  it('OCR with dta7.pdf to have all fields matched', async () => {
    const pdfFile = path.join(inputDir, 'dta7.pdf');
    const result = await tryOCRExtraction(pdfFile);
    expect(result.data).toMatchObject(DTA7);
  });
});
