import type { DtaResult, ValidDocType } from '../types/types.js';

type DtaRegexConfig = {
  [key in keyof DtaResult]: RegExp;
};
type NFeRegexConfig = {
  [key in keyof DtaResult]: RegExp;
};

const dtaRegex: DtaRegexConfig = {
  cnpjEmbarcador: /CNPJ(?:\/CPF)?\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/i,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/i,
  origem: /(?<=origem|ori\s*gem)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
  destino: /(?<=destino|dest\s*ino)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
};

function matchFieldsWithRegex(extractedText: string, docType: ValidDocType): DtaResult {
  switch (docType) {
    case 'dta': {
      return {
        cnpjEmbarcador: extractedText.match(dtaRegex.cnpjEmbarcador)?.[1] ?? null,
        nomeBeneficiario: extractedText.match(dtaRegex.nomeBeneficiario)?.[1] ?? null,
        valorCarga: extractedText.match(dtaRegex.valorCarga)?.[1] ?? null,
        descricaoCarga: extractedText.match(dtaRegex.descricaoCarga)?.[1] ?? null,
        origem: extractedText.match(dtaRegex.origem)?.[1] ?? null,
        destino: extractedText.match(dtaRegex.destino)?.[1] ?? null,
      };
    }
    case 'di': {
      return {};
    }
    case 'nf': {
      return {};
    }
    default:
      throw new Error(`document type ${docType} is unknown`);
  }
}

export { matchFieldsWithRegex };
