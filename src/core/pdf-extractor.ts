import { PDFParse } from 'pdf-parse';
import { matchFields } from '../services/dta-service.js';
import fs from 'node:fs/promises';
import { DtaResult } from '../types/index.js';

async function extractText(pdfFile: string | Buffer) {
  const buffer = await fs.readFile(pdfFile);
  const parser = new PDFParse({ data: buffer });
  const text = await parser.getText();
  return text;
  console.log(123);
}

async function tryTextExtraction(
  pdfFile: string | Buffer
): Promise<{ success: boolean; data?: DtaResult }> {
  try {
    const extractor = await extractText(pdfFile);
    const extractedPages = extractor.pages;

    for (const page of extractedPages) {
      if (!page.text) {
        return { success: false };
      }
    }

    const extractedText: string = extractor.text;
    const result = await matchFields(extractedText);
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
