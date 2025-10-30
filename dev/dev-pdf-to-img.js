import fs from 'node:fs/promises';
import { pdf } from 'pdf-to-img';

async function main(pdfFile) {
  let counter = 1;
  const document = await pdf(pdfFile, { scale: 3 });
  for await (const image of document) {
    await fs.writeFile(`dev/pic/page${counter}.png`, image);
    counter++;
  }
}
main('pdf/dta1.pdf');
