import { PDFParse } from 'pdf-parse';
import type { DTA } from '../models/dta.js';
import { matchFieldsWithRegex } from '../utils/regex-match.js';

async function extractText(file: string | Buffer): Promise<string> {
  const parser = new PDFParse({ data: file });
  const result = (await parser.getText()).text;
  await parser.destroy();
  return result;
}

function isValidDtaResult(dtaResult: DTA): boolean {
  const MINIMUM_FIELDS = 1;
  const filledValues = Object.values(dtaResult).filter((value) => value != null);
  return filledValues.length > MINIMUM_FIELDS;
}

function regexMatch(text: string): DTA {
  const regexObjectResult = matchFieldsWithRegex(text);
  return regexObjectResult;
}

export async function textProcessor(file: Buffer): Promise<{ success: boolean; data?: DTA }> {
  try {
    const extractedText = await extractText(file);
    const textExtractionResult = regexMatch(extractedText);
    if (!isValidDtaResult(textExtractionResult)) {
      return { success: false };
    }

    return { success: true, data: textExtractionResult };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return { success: false };
  }
}
