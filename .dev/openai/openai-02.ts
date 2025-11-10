import OpenAI from 'openai';
const client = new OpenAI();
import fs from 'node:fs/promises';

console.time('timer');
const data = './data/output/data.txt';
const aiData = await fs.readFile(data);

const response = await client.responses.create({
  model: 'chatgpt-4o-latest',
  input: `Quais produtos deste arquivo? apenas os nomes, em um array${aiData}`,
});

console.log(response.output_text);
console.timeEnd('timer');
