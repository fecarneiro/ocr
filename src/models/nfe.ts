import z from 'zod';

export const NFeSchema = z.object({
  dataTransporte: z.string(),
  valorCarga: z.string(),
});

export type NFe = z.infer<typeof NFeSchema>;
