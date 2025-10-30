import sharp from 'sharp';
import fs from 'node:fs/promises';

async function main(input) {
  const metadata = await sharp(input).metadata();
  console.log(metadata);

  const greyscale = await sharp(input)
    .greyscale()
    .withMetadata({ density: 300 })
    .toFile('/dev/dev.png');
  const greyscaleMeta = await sharp(greyscale).metadata();
  console.log(greyscaleMeta);
}

const image = 'pic/png1.png';
main(image);
