import { PDFParse } from 'pdf-parse';
import type { DtaResult, ValidDocType } from '../../models/types.js';
import { matchFieldsWithRegex } from './regex-services.js';

async function extractText(pdfFile: string | Buffer): Promise<string> {
  const parser = new PDFParse({ data: pdfFile });
  const result = (await parser.getText()).text;
  await parser.destroy();
  return result;
}

function isValidDtaResult(dtaResult: DtaResult): boolean {
  const MINIMUM_FIELDS = 1;
  const filledValues = Object.values(dtaResult).filter((value) => value != null);
  return filledValues.length > MINIMUM_FIELDS;
}

function regexMatch(text: string, docType: ValidDocType): DtaResult {
  const regexObjectResult = matchFieldsWithRegex(text, docType);
  return regexObjectResult;
}

async function textExtraction(
  pdfFile: string | Buffer,
  docType: ValidDocType,
): Promise<{ success: boolean; data?: DtaResult }> {
  try {
    const extractedText = await extractText(pdfFile);
    const textExtractionResult = regexMatch(extractedText, docType);
    if (!isValidDtaResult(textExtractionResult)) {
      return { success: false };
    }

    return { success: true, data: textExtractionResult };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return { success: false };
  }
}

export { extractText, isValidDtaResult, textExtraction };
