import { PDFParse } from 'pdf-parse';
import { matchFieldsWithRegex } from '../services/regex-services.js';
import type { DtaResult } from '../types/types.js';

async function extractText(pdfFile: Buffer): Promise<string> {
  const parser = new PDFParse({ data: pdfFile });
  return (await parser.getText()).text;
}

function isValidDtaResult(dtaResult: DtaResult): boolean {
  const MINIMUM_FIELDS = 1;
  const filledValues = Object.values(dtaResult).filter((value) => value != null);
  return filledValues.length > MINIMUM_FIELDS;
}

function regexMatch(text: string): DtaResult {
  const regexObjectResult = matchFieldsWithRegex(text);
  return regexObjectResult;
}

async function tryTextExtraction(pdfFile: Buffer): Promise<{ success: boolean; data?: DtaResult }> {
  try {
    const text = await extractText(pdfFile);
    const textExtractionResult = regexMatch(text);
    if (!isValidDtaResult(textExtractionResult)) {
      return { success: false };
    }

    return { success: true, data: textExtractionResult };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return { success: false };
  }
}

export { extractText, isValidDtaResult, tryTextExtraction };
