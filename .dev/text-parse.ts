import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function fn(file: string) {
  const read = await fs.readFile(file, 'utf8');
  const parser = new PDFParse({ data: read });
  const result = await parser.getText();
  await parser.destroy();
  console.log(result.text);
}

await fn('./data/input/dta1.pdf');
