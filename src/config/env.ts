import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodEnv: string;
}

export const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodEnv: String(process.env.NODE_ENV) || 'developer',
};
