import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import type { ZodObject } from 'zod';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function aiProcessor(
  fileBase64: string,
  aiModel: string,
  prompt: string,
  documentSchema: ZodObject,
) {
  const response = await openai.responses.parse({
    model: aiModel,
    input: [
      { role: 'system', content: prompt },
      {
        role: 'user',
        content: [
          {
            type: 'input_file',
            filename: 'document.pdf',
            file_data: `data:application/pdf;base64,${fileBase64}`,
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
