import type { DtaResult, ValidDocType } from '../types/types.js';

const dtaRegex = {
  dataTransporte: /solicitada\s+em\s+(\d{2}\/\d{2}\/\d{4})/i,
  cnpjEmbarcador: /CNPJ(?:\/CPF)?\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  nomeEmbarcador: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/i,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/i,
  origem: /(?<=origem|ori\s*gem)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
  destino: /(?<=destino|dest\s*ino)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
};
const diRegex = {
  nomeEmbarcador: /Adquirente\s+da\s+Mercadoria\s*\n\s*CNPJ:\s*[\d./-]+\s+(.+)/i,
  origem: /Recinto\s+Aduaneiro:.*?-([A-Z\s]+)\/([A-Z]{2})/i,
  destino: /Endereco\.+:.*?([A-Z\s]+)\s*\/\s*([A-Z]{2})/i,
};
const nfeRegex = {
  dataTransporte: /Data\s+saída\s+da\s+nota\s*([^\n]+)/i,
  valorCarga: /Valor\s+total\s+da\s+nota\s*([^\n]+)/i,
};

function matchFieldsWithRegex(extractedText: string, docType: ValidDocType) {
  switch (docType) {
    case 'dta': {
      return {
        dataTransporte: extractedText.match(dtaRegex.dataTransporte)?.[1] ?? null,
        cnpjEmbarcador: extractedText.match(dtaRegex.cnpjEmbarcador)?.[1] ?? null,
        nomeEmbarcador: extractedText.match(dtaRegex.nomeEmbarcador)?.[1] ?? null,
        valorCarga: extractedText.match(dtaRegex.valorCarga)?.[1] ?? null,
        descricaoCarga: extractedText.match(dtaRegex.descricaoCarga)?.[1] ?? null,
        origem: extractedText.match(dtaRegex.origem)?.[1] ?? null,
        destino: extractedText.match(dtaRegex.destino)?.[1] ?? null,
      };
    }
    case 'di': {
      const nomeEmbarcador = extractedText.match(diRegex.nomeEmbarcador)?.[1] ?? null;
      const origemMatch = extractedText.match(diRegex.origem) ?? null;
      const origem =
        origemMatch && origemMatch[1] && origemMatch[2]
          ? `${origemMatch[1].trim()}/${origemMatch[2]}`
          : null;

      const destinoMatch = extractedText.match(diRegex.destino);
      const destino =
        destinoMatch && destinoMatch[1] && destinoMatch[2]
          ? `${destinoMatch[1].trim()}/${destinoMatch[2]}`
          : null;
      return {
        nomeEmbarcador,
        origem,
        destino,
      };
    }
    case 'nfe': {
      return {
        valorCarga: extractedText.match(nfeRegex.valorCarga)?.[1],
      };
    }
    default:
      throw new Error(`document type ${docType} is unknown`);
  }
}

export { matchFieldsWithRegex };
