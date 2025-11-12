import * as mongoose from 'mongoose';
import type { ExtractionResult, GPTModel } from '../server/models/schemas.js';
import { Extraction } from '../server/models/schemas.js';
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

export async function createConnection() {
  await mongoose.connect(`${MONGODB_URI}`, {
    dbName: 'documents',
  });
}

export async function createDocumentLog(
  gptModel: GPTModel,
  success: boolean,
  executionTime: number,
  output: ExtractionResult,
) {
  try {
    const createDocumentLog = new Extraction({
      executionTime: executionTime,
      model: gptModel,
      result: output,
      success: success,
    });
    await createDocumentLog.save();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

export async function closeConnection() {
  await mongoose.disconnect();
}
