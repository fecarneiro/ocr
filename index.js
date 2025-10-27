import { fromPath } from 'pdf2pic';

const options = {
  density: 100,
  saveFilename: 'untitled',
  savePath: './images',
  format: 'png',
  width: 600,
  height: 600,
};
const convert = fromPath('example.pdf', options);
const pageToConvertAsImage = 1;

convert(pageToConvertAsImage, { responseType: 'image' }).then((resolve) => {
  console.log('Page 1 is now converted as image');

  return resolve;
});
