app.post('/upload/dta', (req: Request, res: Response) => {
  req.uploadController();
  res.send('Hello World');
});
