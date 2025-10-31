import { PDFParse } from 'pdf-parse';
import { matchFields } from '../services/dta-service.js';
import fs from 'node:fs/promises';
import { DtaResult } from '../types/index.js';

async function tryTextExtraction(
  pdfFile: string | Buffer
): Promise<{ success: boolean; data?: DtaResult }> {
  try {
    const buffer = await fs.readFile(pdfFile);
    const parser = new PDFParse({ data: buffer });
    const extractor = await parser.getText();
    const extractedPages = extractor.pages;

    for (const page of extractedPages) {
      if (!page.text) {
        return { success: false };
      }
    }

    const data = extractor.text;
    const result = await matchFields(data);
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

export { tryTextExtraction };
