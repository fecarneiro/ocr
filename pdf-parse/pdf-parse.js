import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function main(file) {
  try {
    console.time('timer');
    const buffer = await fs.readFile(file);

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText(parser);
    console.log(result);
    console.log(result.text);
    console.timeEnd('timer');
  } catch (e) {
    if (e.message != 'Invalid PDF structure.') {
      console.log(e);
    }
    console.log('continuando');
  }
}

const file = 'test2.pdf';
main(file);
