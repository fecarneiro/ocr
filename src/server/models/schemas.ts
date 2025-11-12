import z from 'zod';

export const NFeSchema = z.object({
  dataTransporte: z.string(),
  valorCarga: z.string(),
});

export const DISchema = z.object({
  cnpjImportador: z.string().nullable(),
  nomeImportador: z.string().nullable(),
  origemCidade: z.string().nullable(),
  origemEstado: z.string().nullable(),
  destinoCidade: z.string().nullable(),
  destinoEstado: z.string().nullable(),
  nomeMercadoria: z.string().nullable(),
});

export type NFe = z.infer<typeof NFeSchema>;
export type DI = z.infer<typeof DISchema>;
export type ExtractionResult = DI & NFe;
