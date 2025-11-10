import fs from 'fs';
import OpenAI from 'openai';
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.time('timer');
const file = await client.files.create({
  file: fs.createReadStream('nf.pdf'),
  purpose: 'user_data',
});

const response = await client.responses.create({
  model: 'chatgpt-4o-latest',
  input: [
    {
      role: 'user',
      content: [
        {
          type: 'input_file',
          file_id: file.id,
        },
        {
          type: 'input_text',
          text: 'Quais produtos deste arquivo? apenas os nomes, em um array.',
        },
      ],
    },
  ],
});

console.log(response.output_text);
console.timeEnd('timer');
