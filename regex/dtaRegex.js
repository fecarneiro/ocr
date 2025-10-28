import { pdf } from 'pdf-to-img';
import { createWorker } from 'tesseract.js';
import fs from 'node:fs/promises';

async function main(pdfPath) {
  const document = await pdf(pdfPath, { scale: 4 });
  const worker = await createWorker('por');

  let file = Math.floor(Math.random() * 1000000);
  let extractedText = '';

  for await (const image of document) {
    const {
      data: { text },
    } = await worker.recognize(image);
    extractedText += text;
    // console.log(text);
    await fs.appendFile(`ext${file}.txt`, text, 'utf8');
  }

  const dtaRegex = {
  cnpjEmbarcador: /CNPJ\/CPF\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/,
  unidadeLocal: /Unidade\s+Local\s*:\s*([^\n]+)/,
};


  for await (const [key, value] of Object.entries(dtaRegex)) {
    const fullMatch = extractedText.match(value);
    const match = fullMatch ? fullMatch[1] : null;

    console.log(`${key}: ${match}`);
  }
  await worker.terminate();
}

const pdfPath = process.argv[2] || 'dta.pdf';
main(pdfPath);




  origemUnidade: /Unidade\s+Local\s*:\s*([^\n]+)/,
  destinoUnidade: /Unidade\s+Local\s*:\s*([^\n]+)/,
export { dtaRegex };

const location = [];
