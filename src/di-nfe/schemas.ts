import { z } from 'zod';
import * as mongoose from 'mongoose';
export type GPTModel =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'gpt-4.1-nano'
  | 'gpt-4.1-mini';

export const NFeSchema = z.object({
  dataTransporte: z.string(),
  valorCarga: z.string(),
});

export type NFe = z.infer<typeof NFeSchema>;

export const DISchema = z.object({
  cnpjImportador: z.string().nullable(),
  nomeImportador: z.string().nullable(),
  origemCidade: z.string().nullable(),
  origemEstado: z.string().nullable(),
  destinoCidade: z.string().nullable(),
  destinoEstado: z.string().nullable(),
  nomeMercadoria: z.string().nullable(),
});
export type DI = z.infer<typeof DISchema>;

export type ExtractionResult = DI & NFe;

const extractionSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  executionTime: { type: Number, required: true },
  model: { type: String, required: true },
  result: { type: Object, required: true },
  success: { type: Boolean, required: true },
});
export const Extraction = mongoose.model('Extraction', extractionSchema);
