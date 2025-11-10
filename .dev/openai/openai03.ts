import fs from 'fs/promises';
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.time('timer');
const file = await fs.readFile('nf.pdf');

const response = await client.responses.create({
  model: 'chatgpt-4o-latest',
  input: [
          type: 'input_text',
          text: 'Quais produtos deste arquivo? apenas os nomes, em um array.',
        },
      ],
    },
  ],
});

console.log(response.output_text);
console.timeEnd('timer');
