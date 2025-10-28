import scribe from 'scribe.js-ocr';

const file = 'dta.pdf';
scribe
  .extractText([file])
  .then((res) => console.log(res))
  .then(() => console.log(`duration: ${Date.now() - start} ms`));
