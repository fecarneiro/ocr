import { PDFParse } from 'pdf-parse';
import fs from 'node:fs/promises';

async function main(file) {
  try {
    console.time('timer');
    const buffer = await fs.readFile(file);

    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText(parser);
    const found = result.pages;
    let foundEmpty = found.find((page) => found.text === '');
    console.log(foundEmpty);
    // if (foundEmpty) {
    //   console.log('tem vazio');
    // }
    console.timeEnd('timer');
  } catch (e) {
    if (e.message != 'Invalid PDF structure.') {
      console.log(e);
    }
    console.log('continuando');
  }
}

// const file = 'test-png.pdf';
// const file = 'page1.png';
const file = 'test-png.pdf';
main(file);
