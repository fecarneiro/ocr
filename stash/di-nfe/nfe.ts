import fs from 'node:fs/promises';
import OpenAI from 'openai';
import { zodTextFormat } from 'openai/helpers/zod';
import { NFeSchema, type GPTModel } from '../server/models/schemas.js';
import { gptModel, nfeFile, promptNFe } from './configs.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function nfeOpenai(file: string | Buffer, gptModel: GPTModel) {
  const pdfBuffer = await fs.readFile(file);
  const base64String = pdfBuffer.toString('base64');
  const response = await openai.responses.parse({
    model: gptModel,
    input: [
      { role: 'system', content: promptNFe },
      {
        role: 'user',
        content: [
          {
            type: 'input_file',
            filename: 'di1.pdf',
            file_data: `data:application/pdf;base64,${base64String}`,
          },
          {
            type: 'input_text',
            text: 'Extraia as informações conforme solicitado',
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(NFeSchema, 'output'),
    },
  });

  const output = response.output_parsed;
  return output;
}

if (require.main === module) {
  nfeOpenai(nfeFile, gptModel).then((output) => console.log(output));
}
