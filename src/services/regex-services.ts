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

const nfeRegex = {
  cnpjEmbarcador: /CNPJ(?:\/CPF)?\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  nomeEmbarcador: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/i,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/i,
  origem: /(?<=origem|ori\s*gem)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
  destino: /(?<=destino|dest\s*ino)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
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
    case 'nf': {
      return {};
    }
    case 'di': {
      return {};
    }
    default:
      throw new Error(`document type ${docType} is unknown`);
  }
}

export { matchFieldsWithRegex };
