import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function main(file) {
  const readFile = await fs.readFile(file);
  const parser = new PDFParse(file);

  const result = await parser.getText();
  console.log(result.text);
}

const file = 'dta.pdf';
run(file);
