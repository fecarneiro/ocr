import { pdf } from 'pdf-to-img';

it('generates a PDF', async () => {
  for await (const page of await pdf('example.pdf')) {
    expect(page).toMatchImageSnapshot();
  }
});

// or if you want access to more details:

it('generates a PDF with 2 pages', async () => {
  const doc = await pdf('example.pdf');

  expect(doc.length).toBe(2);

  for await (const page of doc) {
    expect(page).toMatchImageSnapshot();
  }
});
