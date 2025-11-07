import { PDFParse } from 'pdf-parse';
import { matchFieldsWithRegex } from '../src/services/regex-services.js';
import fs from 'node:fs/promises';

async function text(file: string) {
  const buffer = await fs.readFile(file);
  const parser = new PDFParse({ data: buffer });
  const result = await parser.getText();
  await parser.destroy();
  await fs.writeFile('./data/output/text.txt', result.text);
}
await text('./data/input/nfe1.pdf');

async function regex(file: string) {
  const text = await fs.readFile(file, 'utf-8');
  const regex = matchFieldsWithRegex(text, 'nfe');
  console.log(regex);
}
await regex('./data/output/text.txt');
