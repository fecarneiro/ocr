import sharp from 'sharp';

async function main(input) {
  const toFileName = input.split('/')[1];
  console.log(toFileName);

  const metadata = await sharp(input).metadata();
  console.log(metadata);

  const greyscale = await sharp(input)
    .greyscale()
    .withMetadata({ density: 300 })
    .toFile(`pic/grey-${input.split('/')[1]}`);
  const greyscaleMeta = await sharp(greyscale).metadata();
  console.log(greyscaleMeta);
}

const image = 'pic/dta1.png';
main(image);
