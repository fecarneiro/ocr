import { isValidDtaResult, tryTextExtraction } from '../src/core/pdf-extractor';
import { DtaResult } from '../src/types';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.resolve(__dirname, 'fixtures');

describe('tryTextExtraction', () => {
  test('returns true for pdf-parse extraction', async () => {
    const pdfFile = path.join(inputDir, 'dta1-png.pdf');
    const result = await tryTextExtraction(pdfFile);

    expect(result).toBeTruthy(); //CONTINUE
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
