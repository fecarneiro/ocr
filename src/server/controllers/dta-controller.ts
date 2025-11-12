import { type Request, type Response } from 'express';

export const dtaController = (req: Request, res: Response) => {
  const file = req.file;
  console.log(file);
  res.send('dta received');
};
