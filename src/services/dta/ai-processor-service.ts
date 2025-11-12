import fs from 'node:fs/promises';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { DISchema } from '../../models/schemas.js';
import type { GPTModel } from '../../models/types.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function aiProcessor(fileBuffer: Buffer, gptModel: GPTModel, prompt: string) {
  const pdfBuffer = await fs.readFile(fileBuffer);
  const base64String = pdfBuffer.toString('base64');

  const response = await openai.responses.parse({
    model: gptModel,
    input: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: [
          {
            type: 'input_file',
            fileBuffername: 'di1.pdf',
            fileBuffer_data: `data:application/pdf;base64,${base64String}`,
          },
          {
            type: 'input_text',
            text: 'Extraia as informações conforme solicitado',
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(DISchema, 'output'),
    },
  });

  const output = response.output_parsed;

  return output;
}
