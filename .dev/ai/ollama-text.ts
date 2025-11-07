import { Ollama } from 'ollama';
import fs from 'node:fs/promises';
import 'dotenv/config';

const filePath = './data/output/text.txt';
const text = await fs.readFile(filePath, 'utf-8');

const ollama = new Ollama({
  host: 'https://ollama.com',
  headers: { Authorization: 'Bearer ' + process.env.OLLAMA_API_KEY },
});

const response = await ollama.chat({
  model: 'gpt-oss:20b',
  messages: [
    {
      role: 'user',
      content: `Qual nome do importador, CNPJ do importador, cidade/uf do recinto aduaneiro, cidade/uf do destino, nome da mercadoria. Para o documento:${text}`,
    },
  ],
  stream: true,
});

for await (const part of response) {
  process.stdout.write(part.message.content);
}
