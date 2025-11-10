import { Ollama } from 'ollama';
import fs from 'node:fs/promises';
import 'dotenv/config';

const filePath = './data/input/nfe1.pdf';
const pdfBuffer = await fs.readFile(filePath);
const base64Pdf = await pdfBuffer.toString('base64');

const ollama = new Ollama({
  host: 'https://ollama.com',
  headers: { Authorization: 'Bearer ' + process.env.OLLAMA_API_KEY },
});

const response = await ollama.chat({
  model: 'gpt-oss:20b',
  messages: [
    {
      role: 'user',
      content: `Qual origem, destino, nome de embarcador, cnpj embarcador, nomes das mercadorias, valor total da nota. responda apenas estas informacoes e em JSON: ${base64Pdf}`,
    },
  ],
  stream: true,
});

for await (const part of response) {
  process.stdout.write(part.message.content);
}
