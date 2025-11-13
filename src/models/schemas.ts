import z from 'zod';

export const NFeSchema = z.object({
  dataTransporte: z.string(),
  valorCarga: z.string(),
});

export const DISchema = z.object({
  cnpjImportador: z.string(),
  nomeImportador: z.string(),
  origemCidade: z.string(),
  origemEstado: z.string(),
  destinoCidade: z.string(),
  destinoEstado: z.string(),
  nomeMercadoria: z.string(),
});

export type NFe = z.infer<typeof NFeSchema>;
export type DI = z.infer<typeof DISchema>;
export type ExtractionResult = DI & NFe;
