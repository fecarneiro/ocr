import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function fn(file: string) {
  const buffer = await fs.readFile(file);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  console.log(result.text);
}

await fn('./data/input/dta1.pdf');
