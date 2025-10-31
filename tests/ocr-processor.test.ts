import { tryTextExtraction } from '../src/core/pdf-extractor';

test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
