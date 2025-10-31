import { tryTextExtraction } from '../src/core/pdf-extractor';
import fs from 'node:fs/promises';

test('the data is peanut butter', async () => {
  const pdfFile = await fs.readFile('data/input/dta1.pdf');
  const data = await tryTextExtraction(pdfFile);
  expect(data).toBe('string');
});
