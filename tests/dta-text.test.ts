// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { describe, expect, it } from 'vitest';
// import { DTA1, DTA2, DTA3, DTA4, DTA6, DTA7 } from './fixtures/expected-result.js';
// //expect.soft
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const inputDir = path.resolve(__dirname, '..', 'data', 'input');

// describe.concurrent('PDF extracted with PDF Parser', () => {
//   it('PDF Text with dta1.pdf have all fields matched', async () => {
//     const pdfFile = path.join(inputDir, 'dta1.pdf');
//     const result = await textProcessor(pdfFile);
//     expect(result.data).toMatchObject(DTA1);
//   });

//   it('PDF Text with dta2.pdf have all fields matched', async () => {
//     const pdfFile = path.join(inputDir, 'dta2.pdf');
//     const result = await textProcessor(pdfFile);
//     expect(result.data).toMatchObject(DTA2);
//   });

//   it('PDF Text with dta3.pdf have all fields matched', async () => {
//     const pdfFile = path.join(inputDir, 'dta3.pdf');
//     const result = await textProcessor(pdfFile);
//     expect(result.data).toMatchObject(DTA3);
//   });

//   it('PDF Text with dta4.pdf have all fields matched', async () => {
//     const pdfFile = path.join(inputDir, 'dta4.pdf');
//     const result = await textProcessor(pdfFile);
//     expect(result.data).toMatchObject(DTA4);
//   });

//   it('PDF Text with dta6.pdf have all fields matched', async () => {
//     const pdfFile = path.join(inputDir, 'dta6.pdf');
//     const result = await textProcessor(pdfFile);
//     expect(result.data).toMatchObject(DTA6);
//   });

//   it('PDF Text with dta7.pdf have all fields matched', async () => {
//     const pdfFile = path.join(inputDir, 'dta7.pdf');
//     const result = await textProcessor(pdfFile);
//     expect(result.data).toMatchObject(DTA7);
//   });
// });
