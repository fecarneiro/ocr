import fs from 'node:fs/promises';

(async () => {
  const data = await fs.readFile('extraction.txt', 'utf8');
  console.log(data);
})();

// const regex = /Valor da Fatura:/g;
