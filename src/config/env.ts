import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  openaiKey: string;
  aiModel: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: String(process.env.NODE_ENV) || 'developer',
  openaiKey: String(process.env.OPENAI_KEY),
  aiModel: String(process.env.AI_MODEL) || 'gpt-4o-mini',
};
