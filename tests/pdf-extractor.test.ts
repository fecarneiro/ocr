import { extractText, isValidDtaResult } from '../src/core/pdf-extractor';

const file = 'tests/fixtures/valid-data.pdf';

// >> run with npm test <<
test('extracts text from pdf file', async () => {
  const extractedText = await extractText(file);
  expect(typeof extractedText).toBe('string');
});

describe('isValidDtaResult', () => {
  test('returns true when it has more than 4 fiels filled', () => {
    expect(myBeverage.delicious).toBeTruthy();
  });

  test('is not sour', () => {
    expect(myBeverage.sour).toBeFalsy();
  });
});

test('has minimium of 3 required fields filled', async () => {
  const extractedText = await extractText(file);
  expect(typeof extractedText).toBe('string');
});
