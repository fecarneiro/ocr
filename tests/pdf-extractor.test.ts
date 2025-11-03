import { extractText } from '../src/core/pdf-extractor';

test('pdf text extraction', async () => {
  const file = 'tests/fixtures/dta1.pdf';
  const extractedText = await extractText(file);
  expect(typeof extractedText).toBe('string');
});
