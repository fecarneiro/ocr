export interface DtaResult {
  cnpjEmbarcador: string | null;
  nomeBeneficiario: string | null;
  valorCarga: string | null;
  descricaoCarga: string | null;
  origem: string | null;
  destino: string | null;
}

export type ValidDocType = 'dta' | 'di' | 'nfe';
