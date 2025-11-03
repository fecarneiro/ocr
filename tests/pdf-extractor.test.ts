import { extractText, isValidDtaResult } from '../src/core/pdf-extractor';
import { DtaResult } from '../src/types';

const file = 'tests/fixtures/valid-data.pdf';

// >> run with npm test <<
test('extracts text from pdf file', async () => {
  const extractedText = await extractText(file);
  expect(typeof extractedText).toBe('string');
});

describe('isValidDtaResult', () => {
  test('returns true when it has more than 3 fields filled', () => {
    const validResult: DtaResult = {
      cnpjEmbarcador: '12345678901234',
      nomeBeneficiario: 'Empresa X',
      valorCarga: 'R$ 1000',
      descricaoCarga: 'Eletrônicos',
      origin: null,
      destination: null,
    };
    expect(isValidDtaResult(validResult)).toBe(true);
  });

  test('returns false when it has less than 3 fiels filled', () => {
    const invalidResult: DtaResult = {
      cnpjEmbarcador: null,
      nomeBeneficiario: null,
      valorCarga: 'R$ 1000',
      descricaoCarga: 'Eletrônicos',
      origin: null,
      destination: null,
    };
    expect(isValidDtaResult(invalidResult)).toBe(false);
  });

  test('returns false when it has exactly than 3 fiels filled', () => {
    const invalidResult: DtaResult = {
      cnpjEmbarcador: null,
      nomeBeneficiario: 'Empresa X',
      valorCarga: 'R$ 1000',
      descricaoCarga: 'Eletrônicos',
      origin: null,
      destination: null,
    };
    expect(isValidDtaResult(invalidResult)).toBe(false);
  });
});
