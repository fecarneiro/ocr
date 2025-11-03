import { PDFParse } from 'pdf-parse';
import { matchFields } from '../services/dta-service.js';
import fs from 'node:fs/promises';
import { DtaResult } from '../types/index.js';

async function extractText(pdfFile: string | Buffer) {
  const buffer = await fs.readFile(pdfFile);
  const parser = new PDFParse({ data: buffer });
  const text = await parser.getText();
  return text;
}

function hasMinimumRequiredFields(text: DtaResult) {
  const MININUM_FIELDS = 3;
  const filledValues = Object.values(text).filter((value) => value != null);
  return filledValues.length >= MININUM_FIELDS;
}

async function tryTextExtraction(
  pdfFile: string | Buffer
): Promise<{ success: boolean; data?: DtaResult }> {
  try {
    const extractor = await extractText(pdfFile);
    const extractedText = extractor.text;
    const result = await matchFields(extractedText);

    if (!hasMinimumRequiredFields) {
      return { success: false };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return {
      success: false,
    };
  }
}

export { tryTextExtraction, extractText };
