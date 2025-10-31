import { DtaResult } from '../types';

const dtaGeralRegex = {
  cnpjEmbarcador: /CNPJ\/CPF\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/,
};
const dtaLocationRegex = /Unidade\s+Local\s*:\s*([^\n]+)/g;

async function matchFields(data) {
  const result = {};
  for (const [key, value] of Object.entries(dtaGeralRegex)) {
    const fullMatch = data.match(value);
    const match = fullMatch ? fullMatch[1] : null;
    result[key] = match;
  }

  const locations = [];
  const location = data.matchAll(dtaLocationRegex);
  for (const loc of location) {
    locations.push(loc[1]);
  }

  result.origin = locations[0];
  result.destination = locations[1];

  return result;
}
export { matchFields };
