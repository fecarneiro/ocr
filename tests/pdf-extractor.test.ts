import fs from 'node:fs/promises';
import PDFParse from 'pdf-parse';
import { extractText, isValidDtaResult } from '../src/core/pdf-extractor';
import { DtaResult } from '../src/types';

jest.mock('pdf-parse');
jest.mock('node:fs/promises');

describe('extractText', () => {
  test('extracts text from pdf file', async () => {
    const fakeBuffer = Buffer.from('PDF content');
    const fakePDFText = { text: 'Extracted text from PDF' };

    (fs.readFile as jest.Mock).mockResolvedValue(fakeBuffer);
    (PDFParse as unknown as jest.Mock).mockResolvedValue(fakePDFText);

    const result = await extractText('fake-file.pdf');

    expect(fs.readFile).toHaveBeenCalledWith('fake-file.pdf');
    expect(PDFParse).toHaveBeenCalledWith({ data: fakeBuffer });
    expect(result).toBe('Extracted text from PDF');
  });
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
