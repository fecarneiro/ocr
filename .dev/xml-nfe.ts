import fs from 'fs';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

async function extrairXmlCompleto(caminhoArquivo: string) {
  const dataBuffer = fs.readFileSync(caminhoArquivo);

  const data = await pdf(dataBuffer, {
    // Extrair conteúdo bruto
    pagerender: (pageData) => {
      return pageData.getTextContent().then((textContent) => {
        return textContent.items.map((item: any) => item.str).join('');
      });
    },
  });

  // Buscar XML no texto extraído
  const xmlPattern = /<\?xml[\s\S]*?<\/nfeProc>/;
  const match = data.text.match(xmlPattern);

  return match ? match[0] : null;
}
