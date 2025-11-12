import type { DI, ExtractionResult, NFe } from '../../server/models/schemas.js';

export function createResult(diResult: DI, nfeResult: NFe): ExtractionResult {
  return {
    dataTransporte: nfeResult.dataTransporte,
    cnpjImportador: diResult.cnpjImportador,
    nomeImportador: diResult.nomeImportador,
    origemCidade: diResult.origemCidade,
    origemEstado: diResult.origemEstado,
    destinoCidade: diResult.destinoCidade,
    destinoEstado: diResult.destinoEstado,
    nomeMercadoria: diResult.nomeMercadoria,
    valorCarga: nfeResult.valorCarga,
  };
}

export function resultValidation(output: ExtractionResult, fullResult: ExtractionResult) {
  if (JSON.stringify(output) !== JSON.stringify(fullResult)) {
    return { success: false };
  }
  return { success: true };
}
