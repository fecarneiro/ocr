import { PDFParse } from 'pdf-parse';
import { matchFields } from '../services/dta-service.js';
import fs from 'node:fs/promises';
import { DtaResult } from '../types/index.js';

async function extractText(pdfFile: string | Buffer): Promise<string> {
  const buffer = await fs.readFile(pdfFile);
  const parser = new PDFParse({ data: buffer });
  return (await parser.getText()).text;
}

function isValidDtaResult(dtaResult: DtaResult): boolean {
  const MINIMUM_FIELDS = 3;
  const filledValues = Object.values(dtaResult).filter(
    (value) => value != null
  );
  return filledValues.length > MINIMUM_FIELDS;
}

async function tryTextExtraction(
  pdfFile: string | Buffer
): Promise<{ success: boolean; data?: DtaResult }> {
  try {
    const text = await extractText(pdfFile);
    const parsedText = await matchFields(text);

    if (!isValidDtaResult(parsedText)) {
      return { success: false };
    }

    return {
      success: true,
      data: parsedText,
    };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return {
      success: false,
    };
  }
}

export { extractText, isValidDtaResult, tryTextExtraction };
