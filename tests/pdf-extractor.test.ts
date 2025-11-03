import { extractText } from '../src/core/pdf-extractor';

test('pdf text extraction', async () => {
  const extractedText = await extractText('./data/input/dta1.pdf');
  expect(typeof extractedText).toBe('string');
});
