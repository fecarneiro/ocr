const dtaRegex = {
  cnpjEmbarcador: /CNPJ(?:\/CPF)?\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/i,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/i,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/i,
  origem: /Origem\s*[\s\S]*?Unidade\s+Local\s*:\s*([^\n]+)/i,
  destino: /Destino\s*[\s\S]*?Unidade\s+Local\s*:\s*([^\n]+)/i,
};

function matchFieldsWithRegex(data: string) {
  const regexExtraction = {
    cnpjEmbarcador: '',
    nomeBeneficiario: '',
    valorCarga: '',
    descricaoCarga: '',
    origem: '',
    destino: '',
  };

  for (const [key, value] of Object.entries(dtaRegex)) {
    const fullMatch = data.match(value);
    const match = fullMatch ? fullMatch[1] : null;
    regexExtraction[key] = match;
  }
  return regexExtraction;
}
export { matchFieldsWithRegex };
