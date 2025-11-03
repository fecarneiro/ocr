import fs from 'node:fs/promises';
import { PDFParse } from 'pdf-parse';
import { extractText, isValidDtaResult } from '../src/core/pdf-extractor';
import { DtaResult } from '../src/types';

jest.mock('fs/promises');
jest.mock('pdf-parser');
const file = 'tests/fixtures/valid-data.pdf';

(describe('extractText'),
  () => {
    const mockPDFParse = PDFParse as jest.MockedClass<typeof PDFParse>;
    const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;
    test('extracts text from pdf file', async () => {

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
      nomeBeneficiario: undefined,
      valorCarga: undefined,
      descricaoCarga: undefined,
      origin: undefined,
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
