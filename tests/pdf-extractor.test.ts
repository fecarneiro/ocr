import {
  extractText,
  hasMinimumRequiredFields,
} from '../src/core/pdf-extractor';

// >> run with npm test <<
test('pdf text extraction', async () => {
  const file = 'tests/fixtures/dta1.pdf';
  const extractedText = await extractText(file);
  expect(typeof extractedText).toBe('string');
});

test('pdf text extraction', async () => {
  const file = 'tests/fixtures/dta1.pdf';
  const extractedText = await extractText(file);
  expect(typeof extractedText).toBe('string');
});
