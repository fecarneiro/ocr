import fs from 'fs';
import PDFParser from 'pdf2json';
// Mostra o diretório de trabalho atual

const pdfParser = new PDFParser();

pdfParser.on('pdfParser_dataError', (errData) => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', (pdfData) => {
  fs.writeFile('./.dev/nf.json', JSON.stringify(pdfData, null, 2), (data) => console.log(data));
});

pdfParser.loadPDF('./data/input/nfe1.pdf');
