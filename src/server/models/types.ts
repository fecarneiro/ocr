export type ValidDocType = 'dta' | 'di' | 'nfe';

export type GPTModel =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'gpt-4.1-nano'
  | 'gpt-4.1-mini';

export interface DtaResult {
  dataTransporte: string | null;
  cnpjEmbarcador: string | null;
  nomeEmbarcador: string | null;
  valorCarga: string | null;
  descricaoCarga: string | null;
  origem: string | null;
  destino: string | null;
}
