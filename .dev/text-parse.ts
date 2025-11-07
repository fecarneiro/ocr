import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function fn(file: string) {
  const buffer = await fs.readFile(file);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  await fs.writeFile('./data/output/text.txt', result.text);
}

await fn('./data/input/di1.pdf');
