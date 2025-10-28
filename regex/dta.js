const dtaPatterns = {
  cnpjEmbarcador: /CNPJ\/CPF\s+do\s+Beneficiário\s*:\s*([0-9./-]+)/,
  nomeBeneficiario:
    /Nome\s+do\s+Beneficiário\s*:\s*([A-Z\s]+?)(?=\s*(?:CNPJ|$|\n))/,
  destinoUnidade:
    /Destino[\s\S]*?Unidade\s+Local\s*:\s*([0-9-]+\s*-\s*[A-Z\s]+?)(?=\s*Recinto|\s*$)/,
  origemUnidade:
    /Origem[\s\S]*?Unidade\s+Local\s*:\s*([0-9-]+\s*-\s*[A-Z\s]+?)(?=\s*Recinto|\s*$)/,
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([0-9.,]+)/,
  descricaoCarga:
    /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*(.+?)(?=\s*SOINV|\s*$)/,
};

export { dtaPatterns };
