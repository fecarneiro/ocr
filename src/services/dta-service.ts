const dtaRegex = {
  cnpjEmbarcador: /CNPJ\/CPF\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/,
  location: /Unidade\s+Local\s*:\s*([^\n]+)/g,
};

async function matchFields(data: string) {
  const regexExtraction = {
    cnpjEmbarcador: '',
    nomeBeneficiario: '',
    valorCarga: '',
    descricaoCarga: '',
    origin: '',
    destination: '',
  };

  for (const [key, value] of Object.entries(dtaRegex)) {
    const fullMatch = data.match(value);
    const match = fullMatch ? fullMatch[1] : null;
    regexExtraction[key] = match;
  }

  const locations = [];
  const location = data.matchAll(dtaRegex.location);
  for (const loc of location) {
    locations.push(loc[1]);
  }

  regexExtraction.origin = locations[0];
  regexExtraction.destination = locations[1];

  return regexExtraction;
}
export { matchFields };
