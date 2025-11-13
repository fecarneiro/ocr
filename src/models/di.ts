import z from 'zod';

export const DISchema = z.object({
  cnpjImportador: z.string(),
  nomeImportador: z.string(),
  origemCidade: z.string(),
  origemEstado: z.string(),
  destinoCidade: z.string(),
  destinoEstado: z.string(),
  nomeMercadoria: z.string(),
});

export type DI = z.infer<typeof DISchema>;
