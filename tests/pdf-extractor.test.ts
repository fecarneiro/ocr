import { extractText } from '../src/core/pdf-extractor';
import fs from 'node:fs/promises';

test('pdf text extraction', async () => {
  const pdfFile = await fs.readFile('data/input/dta1.pdf');
  const data = await extractText(pdfFile);
  expect(data).toBe('string');
});
