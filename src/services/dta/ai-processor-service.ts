import fs from 'node:fs/promises';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import type { ZodObject } from 'zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function aiProcessor(
  fileBuffer: Buffer,
  aiModel: string,
  prompt: string,
  documentSchema: ZodObject,
) {
  const pdfBuffer = await fs.readFile(fileBuffer);
  const base64String = pdfBuffer.toString('base64');

  const response = await openai.responses.parse({
    model: aiModel,
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
      format: zodTextFormat(documentSchema, 'output'),
    },
  });

  const output = response.output_parsed;
  return output;
}
