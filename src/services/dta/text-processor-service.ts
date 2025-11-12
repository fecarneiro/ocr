import { PDFParse } from 'pdf-parse';
import type { DtaResult } from '../../models/types.js';
import { matchFieldsWithRegex } from './regex-service.js';

async function extractText(file: string | Buffer): Promise<string> {
  const parser = new PDFParse({ data: file });
  const result = (await parser.getText()).text;
  await parser.destroy();
  return result;
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

export async function textProcessor(file: Buffer): Promise<{ success: boolean; data?: DtaResult }> {
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
