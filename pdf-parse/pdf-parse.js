import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function main(file) {
  console.time('timer');
  const buffer = await fs.readFile(file);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText(parser);
  console.log(result.text);
  console.timeEnd('timer');
}

const file = 'dta.pdf';
main(file);
