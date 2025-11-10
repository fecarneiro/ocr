import { GoogleGenAI } from '@google/genai';

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
console.time('timer');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//main
async function main() {
  const pdfResp = await fetch(
    'https://discovery.ucl.ac.uk/id/eprint/10089234/1/343019_3_art_0_py4t4l_convrt.pdf',
  ).then((response) => response.arrayBuffer());

  const contents = [
    { text: 'Summarize this document' },
    {
      inlineData: {
        mimeType: 'application/pdf',
        data: Buffer.from(pdfResp).toString('base64'),
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp',
    contents: contents,
  });
  console.log(response.text);
}

//
await main();
console.timeEnd('timer');
