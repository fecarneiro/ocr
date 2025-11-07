export interface DtaResult {
  cnpjEmbarcador: string | null;
  nomeEmbarcador: string | null;
  valorCarga: string | null;
  descricaoCarga: string | null;
  origem: string | null;
  destino: string | null;
}

export interface NFeResult {
  dataTransporte: string | null;
  valorCarga: string | null;
  origemCidade: string | null;
  origemEstado: string | null;
}

export interface NFeResult {
  cnpjEmbarcador: string | null;
  nomeEmbarcador: string | null;
  descricaoCarga: string | null;
  destinoCidade: string | null;
  destinoEstado: string | null;
}

export type ValidDocType = 'dta' | 'di' | 'nfe';
