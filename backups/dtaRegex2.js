const dtaRegex = {
  cnpjEmbarcador: /CNPJ\/CPF\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  nomeBeneficiario: /Nome\s+do\s+Beneficiário\s*:\s*([^\n]+)/,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([^\n]+)/,
  descricaoCarga: /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*([^\n]+)/,
  origemUnidade: /Unidade\s+Local\s*:\s*([^\n]+)/,
  destinoUnidade: /Unidade\s+Local\s*:\s*([^\n]+)/,
};

export { dtaRegex };

const location = [];
