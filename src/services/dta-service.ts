import type { DtaResult } from '../types/index.js';

type DtaRegexConfig = {
  [key in keyof DtaResult]: RegExp;
};

const dtaRegex: DtaRegexConfig = {
  cnpjEmbarcador: /CNPJ(?:\/CPF)?\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/i,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/i,
  origem:
    /(?<=origem|ori\s*gem)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
  destino:
    /(?<=destino|dest\s*ino)[^\n]*\n[\s\S]*?Unidade\s+Local\s*:\s*(\d+\s*-[^\n]+)/i,
};

function matchFieldsWithRegex(data: string): DtaResult {
  const result: DtaResult = {
    cnpjEmbarcador: data.match(dtaRegex.cnpjEmbarcador)?.[1] ?? null,
    nomeBeneficiario: data.match(dtaRegex.nomeBeneficiario)?.[1] ?? null,
    valorCarga: data.match(dtaRegex.valorCarga)?.[1] ?? null,
    descricaoCarga: data.match(dtaRegex.descricaoCarga)?.[1] ?? null,
    origem: data.match(dtaRegex.origem)?.[1] ?? null,
    destino: data.match(dtaRegex.destino)?.[1] ?? null,
  };
  return result;
}

export { matchFieldsWithRegex };
