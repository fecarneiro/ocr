import fs from 'node:fs/promises';

// (async () => {
//   const data = await fs.readFile('extraction.txt', 'utf8');
//   console.log(data);
// })();

const regex = /Casa/gi;
const text = 'a casa a logo';
const match = text.match(regex);
console.log(match);
console.log(match.length);
