import scribe from 'scribe.js-ocr';

const start = Date.now();
scribe
  .extractText(['test.pdf'])
  .then((res) => console.log(res))
  .then(() => console.log(`duration: ${Date.now() - start} ms`));
