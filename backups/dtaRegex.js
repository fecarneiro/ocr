const dtaRegex = {
  /** Captura CNPJ/CPF após "CNPJ/CPF do Beneficiário:" */
  cnpjEmbarcador: /CNPJ\/CPF\s+do\s+Beneficiário\s*:\s*([0-9./-]+)/,

  /** Captura nome em maiúsculas após "Nome do Beneficiário:", para antes de "CNPJ" */
  nomeBeneficiario:
    /Nome\s+do\s+Beneficiário\s*:\s*([A-Z\s]+?)(?=\s*(?:CNPJ|$|\n))/,

  /** Captura "código - NOME" após "Destino...Unidade Local:", para antes de "Recinto" */
  destinoUnidade:
    /Destino[\s\S]*?Unidade\s+Local\s*:\s*([0-9-]+\s*-\s*[A-Z\s]+?)(?=\s*Recinto|\s*$)/,

  /** Captura "código - NOME" após "Origem...Unidade Local:", para antes de "Recinto" */
  origemUnidade:
    /Origem[\s\S]*?Unidade\s+Local\s*:\s*([0-9-]+\s*-\s*[A-Z\s]+?)(?=\s*Recinto|\s*$)/,

  /** Captura valor numérico após "Valor da Carga em Moeda Nacional:" */
  valorCarga: /Valor\s+da\s+Carga\s+em\s+Moeda\s+Nacional\s*:\s*([0-9.,]+)/,

  /** Captura texto após "Descrição da Carga na Fatura:", para antes de "SOINV" */
  descricaoCarga:
    /Descrição\s+da\s+Carga\s+na\s+Fatura\s*:\s*(.+?)(?=\s*SOINV|\s*$)/,
};
